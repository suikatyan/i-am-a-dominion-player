import Card from "interface/card/Card";
import Deck from "property/Deck";
import Hand from "property/Hand";
import Field from "property/Field";
import Discarded from "property/Discarded";

export default class PropertyHandler {
  private deck = new Deck();
  private hand = new Hand();
  private field = new Field();
  private discarded = new Discarded();

  async initilize() : Promise<void> {
    await this.deck.initilize();
    this.deck.shuffle();
    this.draw(5);
  }

  draw(count = 1) : void {
    let cards: Card[];
    if (this.deck.count() >= count) {
      cards = this.deck.popSome(count);
    } else {
      cards = this.deck.popSome(this.deck.count());

    }

    this.hand.pushSome(cards);
  }

  clean() {

  }

  putDown(cards: Card | Card[]) {
    if (!Array.isArray(cards)) {
      cards = [cards]
    }

    for (const card of cards) {
      this.field.push(this.hand.removeCard(card.itemId()));
    }
  }

  getHand() {
    return this.hand;
  }

  getField() {
    return this.field;
  }
}
