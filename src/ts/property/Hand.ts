import Card from "interface/card/Card";
import Vue from "vue";
import CardComponent from "component/CardComponent";

export default class Hand {
  private cards: Card[] = [];
  private view: Vue;

  constructor() {
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

  push(card: Card) : void {
    this.cards.push(card);
  }

  pushSome(cards: Card[]) : void {
    this.cards.splice(0, 0, ...cards);
  }

  getCards() {
    return this.cards;
  }
}
