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
    let cards: Card[] = [];
    while (true) {
      cards.push(...this.deck.popSome(count - cards.length));
      if (this.discarded.count() === 0 || cards.length >= count) {
        break;
      }
      this.rebornDeck();
    }

    this.hand.pushSome(cards);
  }

  clean() {
    this.discarded.pushSome(this.hand.removeAllCard());
    this.discarded.pushSome(this.field.removeAllCard());
    this.draw(5);
  }

  rebornDeck() {
    this.deck.pushSome(this.discarded.removeAllCard());
    this.deck.shuffle();
  }

  putDown(cards: Card | Card[]) {
    if (!Array.isArray(cards)) {
      cards = [cards]
    }

    for (const card of cards) {
      this.field.push(this.hand.removeCard(card.itemId()));
    }
  }

  discard(cards: Card | Card[]) {
    if (!Array.isArray(cards)) {
      cards = [cards]
    }

    const itemIds = cards.map(card => card.itemId());
    for (const itemId of itemIds) {
      this.discarded.push(this.hand.removeCard(itemId));
    }
  }

  getHand() {
    return this.hand;
  }

  getField() {
    return this.field;
  }

  getDeck() {
    return this.deck;
  }

  getDiscarded() {
    return this.discarded;
  }
}
