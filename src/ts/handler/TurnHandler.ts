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
import Sleeper from "util/Sleeper";

export default class TurnHandler implements Turn {
  @DI.inject()
  private context: () => Context;
  @DI.inject()
  private notification: () => NotificationHandler;
  @DI.inject()
  private marketHandler: () => MarketHandler;

  async start() : Promise<void> {
    this.context().turn.initialize();
    this.notification().say(this.context().turn.currentPlayer.name() + "の番です。\nアクションカードか財宝カードを選んでください。\nまたは、ターンを終了してください。");

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

  }

  async onStartActionPhase() : Promise<boolean> {
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
          this.context().turn.propertyHandler.putDown(
            CardFilter.filter(
              this.context().turn.hand.getCards(),
              {include: [FilterKey.Treasure]},
            ),
          );

          return true;
      }

      this.onStartActionEach(selectedCard as Action);
      await this.onExcuteAction(selectedCard as Action);
      this.onEndActionEach();

      return true;
    }
  }

  async getActionSelectedCard() : Promise<Card | void> {
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
    this.notification().say("購入するカードを選んでください。\nまたは、ターンを終了してください。");
    this.context().turn.turnPointHandler.coin.set(this.calculateCoinPoint());
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

      return true;
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
      if (isSoldout && isEnough) {
        this.context().turn.turnPointHandler.usedCoin.increase(result.card.cost());
        return result.card;
      }

      return await this.getSelectedBuyCard();
    }
  }

  calculateCoinPoint() : number {
    const field = this.context().turn.propertyHandler.getField();
    return field.getCards().reduce((previous, current) => {
      switch (current.category()) {
        case CardCategory.Treasure:
          return previous + (<Treasure> current).value();
        case CardCategory.Action:
          return previous + (<Action> current).effect().coin();
      }

      return 0;
    }, this.context().turn.turnPointHandler.usedCoin.get() * -1);
  }

  onStartBuyEach() : void {
    this.context().turn.turnPointHandler.buy.decrease();
  }

  async onBuyCard(card: Card) : Promise<void> {
    this.context().turn.discarded.push(await this.marketHandler().deal(card.cardId()));
  }

  onEndBuyEach() : void {
    this.context().turn.turnPointHandler.coin.set(this.calculateCoinPoint());
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
