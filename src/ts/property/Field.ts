import Card from "interface/card/Card";
import Vue from "vue";
import CardComponent from "component/CardComponent";

let view: Vue;

export default class Field {
  private cards: Card[] = [];
  private view: Vue;

  constructor() {
    if (view === undefined) {
      view = new Vue({
        el: "#field",
        data: {
          cards: this.cards,
        },
        components: {
          "card-component": CardComponent,
        },
      });
    }
    this.view = view;
  }

  push(card: Card) : void {
    this.cards.push(card);
  }

  pushSome(cards: Card[]) : void {
    this.cards.splice(0, 0, ...cards);
  }
}
