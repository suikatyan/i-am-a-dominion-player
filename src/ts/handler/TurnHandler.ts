import Turn from "interface/turn/Turn";
import CardCategory from "list/CardCategory";
import Context from "context/Context";
import DI from "util/DI";
import CardPicker from "util/CardPicker";
import Card from "interface/card/Card";
import NotificationHandler from "handler/NotificationHandler";

export default class TurnHandler implements Turn {
  @DI.inject()
  private context: () => Context;
  @DI.inject()
  private notification: () => NotificationHandler;

  async start() : Promise<void> {
    this.context().turn.initialize();
    this.notification().say(this.context().turn.currentPlayer.name() + "の番です。");

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
      if (this.context().turn.actionPoint <= 0) {
        return;
      }

      const selectedCard = await this.getSelectedCard();
      switch (selectedCard.category()) {
        case CardCategory.Curse:
        case CardCategory.Victory:
          // もう一度カードを選択させる
          continue;
        case CardCategory.Treasure:
          return;
        case CardCategory.Action:
          // 何もしない
      }

      await this.onStartActionEach();
      await this.onExcuteAction();
      await this.onEndActionEach();
    }
  }

  async getSelectedCard() : Promise<Card> {
    const result = await CardPicker.card(
      this.context().turn.hand,
      document.querySelectorAll("#hand-cards .card"),
    );

    if (result) {
      return result.card;
    } else {
      throw new Error();
    }

  }

  onStartActionEach() : void {

  }

  onExcuteAction() : void {

  }

  onEndActionEach() : void {

  }

  onEndActionPhase() : void {

  }

  async onStartBuyPhase() : Promise<void> {
    while(true) {
      if (this.context().turn.actionPoint === 0) {
        return;
      }

      const selectedBuyCard = await this.getSelectedBuyCard();
      await this.onStartBuyEach();
      await this.onBuyCard();
      await this.onEndBuyEach();
    }
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
