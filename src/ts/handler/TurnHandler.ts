import Turn from "interface/turn/Turn";
import CardCategory from "list/CardCategory";
import Context from "context/Context";
import DI from "util/DI";
import CardPicker from "util/CardPicker";
import Card from "interface/card/Card";
import Action from "interface/card/Action";
import Treasure from "interface/card/Treasure";
import NotificationHandler from "handler/NotificationHandler";
import {CardFilter, FilterKey} from "util/CardFilter";

export default class TurnHandler implements Turn {
  @DI.inject()
  private context: () => Context;
  @DI.inject()
  private notification: () => NotificationHandler;

  async start() : Promise<void> {
    this.context().turn.initialize();
    this.notification().say(this.context().turn.currentPlayer.name() + "の番です。\nアクションカードか財宝カードを選んでください。\nまたは、ターンを終了してください。");

    this.onStartTurn();

    await this.onStartActionPhase();
    this.onEndActionPhase();

    this.onStartBuyPhase();
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
      document.querySelectorAll("#hand-cards .card"),
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
    while(true) {
      this.context().turn.turnPointHandler.coin.set(this.calculateCoinPoint());
      if (this.context().turn.turnPointHandler.action.get() === 0) {
        return;
      }

      const selectedBuyCard = await this.getSelectedBuyCard();
      await this.onStartBuyEach();
      await this.onBuyCard();
      await this.onEndBuyEach();
    }
  }

  async getSelectedBuyCard() : Promise<Card> {

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
    }, 0);
  }

  onStartBuyEach() : void {

  }

  onBuyCard() : void {

  }

  onEndBuyEach() : void {

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
