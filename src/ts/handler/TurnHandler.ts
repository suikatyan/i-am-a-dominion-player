import Turn from "interface/turn/Turn";
import CardCategory from "list/CardCategory";
import Context from "context/Context";
import DI from "util/DI";
import CardPicker from "util/CardPicker";
import Card from "interface/card/Card";
import Action from "interface/card/Action";
import Treasure from "interface/card/Treasure";
import Hand from "property/Hand";
import NotificationHandler from "handler/NotificationHandler";
import MarketHandler from "handler/MarketHandler";
import {CardFilter, FilterKey} from "util/CardFilter";

export default class TurnHandler implements Turn {
  @DI.inject()
  private context: () => Context;
  @DI.inject()
  private notification: () => NotificationHandler;
  @DI.inject()
  private marketHandler: () => MarketHandler;
  private isSkipableForCoinPick = false;

  async start() : Promise<void> {
    this.onStartTurn();

    const canContinue = await this.onStartActionPhase();
    this.onEndActionPhase();

    if (canContinue) {
      await this.onStartBuyPhase();
      this.onEndBuyPhase();
    }

    this.onStartClean();
    this.onClean();
    this.onEndClean();

    this.onEndTurn();
  }

  onStartTurn() {
    this.context().turn.initialize();
    this.notification().say(this.context().turn.currentPlayer.name() + "の番です。\nアクションカードか財宝カードを選んでください。\nまたは、ターンを終了してください。");
  }

  async onStartActionPhase() : Promise<boolean> {
    // 手札に財宝カードもアクションカードも無い場合は、購入フェーズに移れなくなる問題の対策
    if (CardFilter.filter(this.context().turn.hand.getCards(), {include: [FilterKey.Treasure, FilterKey.Action]}).length === 0) {
      return true;
    }

    // アクションフェーズで使うカードを受け付ける
    while (true) {
      if (this.context().turn.turnPointHandler.action.get() <= 0) {
        return true;
      }

      const selectedCard = await this.getActionSelectedCard();
      if (!selectedCard) {
        return false;
      }

      switch (selectedCard.category()) {
        case CardCategory.Curse:
        case CardCategory.Victory:
          // もう一度カードを選択させる
          continue;
        case CardCategory.Action:
          // 先に進める
          break;
        case CardCategory.Treasure:
          this.isSkipableForCoinPick = true;

          return true;
      }

      this.onStartActionEach(selectedCard as Action);
      await this.onExcuteAction(selectedCard as Action);
      this.onEndActionEach();
    }
  }

  async getActionSelectedCard() : Promise<Card | void> {
    // Robotの場合
    if (this.context().turn.currentPlayer.isRobot()) {
      return;
      // return this.context().turn.currentPlayer.getActionSelectedCard();
    }

    const result = await CardPicker.cardAndButton(
      this.context().turn.hand.getCards(),
      Hand.querySelectorAll(),
    );

    if (result === null) {
      throw new Error();
    }

    if (!result) {
      return;
    }

    return result.card;
  }

  onStartActionEach(card: Action) : void {
    this.context().turn.turnPointHandler.action.decrease();
    this.context().turn.propertyHandler.putDown(card);
  }

  async onExcuteAction(card: Action) : Promise<void> {
    await card.excute();
  }

  onEndActionEach() : void {

  }

  onEndActionPhase() : void {

  }

  async onStartBuyPhase() : Promise<boolean> {
    this.notification().say("財宝カードを選択してカードを購入してください。\nまたは、ターンを終了してください。");

    // 購入に使う財宝カードの選択を受け付ける
    while (!this.isSkipableForCoinPick) {
      // 手札に財宝カードもアクションカードも無い場合は、購入フェーズで買い物出来なくなる問題の対策
      if (CardFilter.filter(this.context().turn.hand.getCards(), {include: [FilterKey.Treasure, FilterKey.Action]}).length === 0) {
        break;
      }

      const selectedCard = await this.getActionSelectedCard();
      if (!selectedCard) {
        return false;
      }

      if (selectedCard.category() === CardCategory.Treasure) {
        this.isSkipableForCoinPick = true;
      }
    }

    this.notification().say("購入するカードを選んでください。\nまたは、ターンを終了してください。");

    // 財宝カードをフィールドに出す
    const treasureCards = CardFilter.filter(
      this.context().turn.hand.getCards(),
      {include: [FilterKey.Treasure]},
    );
    this.context().turn.turnPointHandler.coin.increase(treasureCards.reduce((previous, current) => {
      return current.category() === CardCategory.Treasure ? (<Treasure> current).value() + previous : previous;
    }, 0));
    this.context().turn.propertyHandler.putDown(treasureCards);

    // 購入カードを受け付ける
    while(true) {
      if (this.context().turn.turnPointHandler.buy.get() === 0) {
        return false;
      }

      const selectedBuyCard = await this.getSelectedBuyCard();
      if (!selectedBuyCard) {
        return false;
      }
      await this.onStartBuyEach();
      await this.onBuyCard(selectedBuyCard);
      await this.onEndBuyEach();
    }
  }

  async getSelectedBuyCard() : Promise<Card | void> {
    if (this.context().turn.currentPlayer.isRobot()) {
      return;
      // return this.context().turn.currentPlayer.getSelectedBuyCard();
    }

    const result = await CardPicker.cardAndButton(
      this.marketHandler().getMarketCards().map((item) => item.card),
      MarketHandler.querySelectorAll(),
    );

    if (result === null) {
      throw new Error();
    }

    if (!result) {
      return;
    }

    while (true) {
      // 在庫チェック
      const isSoldout = this.marketHandler().isSoldout(result.card.cardId());
      // コストチェック
      const isEnough = result.card.cost() <= this.context().turn.turnPointHandler.coin.get();
      if (!isSoldout && isEnough) {
        this.context().turn.turnPointHandler.usedCoin.increase(result.card.cost());
        this.context().turn.turnPointHandler.coin.decrease(result.card.cost());
        return result.card;
      }

      return await this.getSelectedBuyCard();
    }
  }

  onStartBuyEach() : void {
    this.context().turn.turnPointHandler.buy.decrease();
  }

  async onBuyCard(card: Card) : Promise<void> {
    this.context().turn.discarded.push(await this.marketHandler().deal(card.cardId()));
  }

  onEndBuyEach() : void {

  }

  onEndBuyPhase() : void {

  }

  onStartClean() : void {

  }

  onClean() : void {
    const hand = this.context().turn.propertyHandler.getHand();
    const field = this.context().turn.propertyHandler.getField();
    const discarded = this.context().turn.propertyHandler.getDiscarded();

    discarded.pushSome(hand.removeAllCard());
    discarded.pushSome(field.removeAllCard());
    this.context().turn.propertyHandler.draw(5);
  }

  onEndClean() : void {

  }

  onEndTurn() : void  {

  }
}
