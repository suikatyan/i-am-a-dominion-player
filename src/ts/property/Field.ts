import Card from "interface/card/Card";

export default class Field {
  private cards: Card[] = [];

  push(card: Card) : void {
    this.cards.push(card);
  }

  pushSome(cards: Card[]) : void {
    this.cards.splice(0, 0, ...cards);
  }
}
