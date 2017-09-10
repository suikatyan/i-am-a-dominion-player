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

  async start() : Promise<void> {
    this.context().turn.initialize();
    this.notification().say(this.context().turn.currentPlayer.name() + "の番です。\nアクションカードか財宝カードを選んでください。\nまたは、ターンを終了してください。");

    this.onStartTurn();

    await this.onStartActionPhase();
    this.onEndActionPhase();

    await this.onStartBuyPhase();
    this.onEndBuyPhase();

    this.onStartClean();
    this.onEndClean();

    this.onEndTurn();
  }

  onStartTurn() {

  }

  async onStartActionPhase() : Promise<void> {
    while (true) {
      if (this.context().turn.turnPointHandler.action.get() <= 0) {
        return;
      }

      const selectedCard = await this.getSelectedCard();
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

          return;
      }

      await this.onStartActionEach();
      await this.onExcuteAction(selectedCard as Action);
      await this.onEndActionEach();
    }
  }

  async getSelectedCard() : Promise<Card> {
    const result = await CardPicker.card(
      this.context().turn.hand.getCards(),
      Hand.querySelectorAll(),
    );

    if (result) {
      return result.card;
    } else {
      throw new Error();
    }

  }

  onStartActionEach() : void {
    this.context().turn.turnPointHandler.action.decrease();
  }

  onExcuteAction(card: Action) : void {
    card.excute();
  }

  onEndActionEach() : void {

  }

  onEndActionPhase() : void {

  }

  async onStartBuyPhase() : Promise<void> {
    this.notification().say("購入するカードを選んでください。\nまたは、ターンを終了してください。");
    this.context().turn.turnPointHandler.coin.set(this.calculateCoinPoint());
    while(true) {
      if (this.context().turn.turnPointHandler.buy.get() === 0) {
        return;
      }

      const selectedBuyCard = await this.getSelectedBuyCard();
      await this.onStartBuyEach();
      await this.onBuyCard(selectedBuyCard);
      await this.onEndBuyEach();
    }
  }

  async getSelectedBuyCard() : Promise<Card> {
    const result = await CardPicker.card(
      this.marketHandler().getMarketCards().map((item) => item.card),
      MarketHandler.querySelectorAll(),
    );

    if (result === null) {
      throw new Error();
    }

    while (true) {
      if (result.card.cost() <= this.context().turn.turnPointHandler.coin.get()) {
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

  onEndClean() : void {

  }

  onEndTurn() : void  {

  }
}
