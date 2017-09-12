import Card from "interface/card/Card";
import CardFactory from "factory/CardFactory";
import Util from "util/Util";
import Context from "context/Context";
import DI from "util/DI";

export default class Deck {
  @DI.inject()
  private context: () => Context;
  private cards: Card[] = [];

  async initilize() : Promise<void> {
    for (const [cardId, count] of this.context().game.cardSet.startCards()) {
      for (let i = 0; i < count; i++) {
        this.cards.push(await CardFactory.build(cardId));
      }
    }
  }

  shuffle() : void {
    Util.shuffle(this.cards);
  }

  pop() : Card {
    return <Card>this.cards.pop();
  }

  popSome(count = 1) : Card[] {
    return this.cards.splice(0, count);
  }

  push(card: Card) : void {
    this.cards.push(card);
  }

  pushSome(cards: Card[]) : void {
    this.cards.splice(0, 0, ...cards);
  }

  count() : number {
    return this.cards.length;
  }
}
