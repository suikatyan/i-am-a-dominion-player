import Card from "interface/card/Card";
import Vue from "vue";
import CardComponent from "component/CardComponent";

let needView = true;

export default class Hand {
  private cards: Card[] = [];
  private view: Vue;

  static querySelectorAll() {
    return document.querySelectorAll("#hand-cards .card");
  }

  constructor() {
    if (needView) {
      needView = false;
      this.view = new Vue({
        el: "#hand-cards",
        data: {
          cards: this.cards,
        },
        components: {
          "card-component": CardComponent,
        },
      });
    }
  }

  push(card: Card) : void {
    this.cards.push(card);
  }

  pushSome(cards: Card[]) : void {
    this.cards.splice(0, 0, ...cards);
  }

  getCards() {
    return this.cards;
  }

  count() : number {
    return this.cards.length;
  }

  removeCard(id: string) : Card {
    const index = this.cards.findIndex(card => card.itemId() === id);
    return this.cards.splice(index, 1).pop() as Card;
  }

  removeAllCard() {
    return this.cards.splice(0, this.cards.length);
  }
}
