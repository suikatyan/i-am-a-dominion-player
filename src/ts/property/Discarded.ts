import Card from "interface/card/Card";

export default class Discarded {
  private cards: Card[] = [];

  count() : number {
    return this.cards.length;
  }

  push(card: Card) : void {
    this.cards.push(card);
  }

  pushSome(cards: Card[]) : void {
    this.cards.splice(0, 0, ...cards);
  }
}
