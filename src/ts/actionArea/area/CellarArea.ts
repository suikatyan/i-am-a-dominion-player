import Card from "interface/card/Card";
import Vue from 'vue';
import AbstractActionArea from "actionArea/AbstractActionArea";
import EventAwaiter from "util/EventAwaiter";
import DefaultAreaComponent from "component/area/DefaultAreaComponent";
import Cellar from "card/catalog/Cellar";

export default class CellarArea extends AbstractActionArea {
  protected cards: Card[] = [];
  protected selectedCards: Card[] = [];

  constructor(cards: Card[]) {
    super();

    this.cards = cards;
    this.view = new Vue({
      el: "#" + AbstractActionArea.AREA_ID,
      data: {
        parameters: {
          cards: this.cards,
          source: new Cellar(),
          description: "好きな枚数の手札を捨て札にできます。捨て札にした枚数分、カードが引けます。",
          selectedCards: this.selectedCards,
          count: {
            max: Infinity,
            min: 0,
          }
        },
      },
      components: {
        "area-component": DefaultAreaComponent,
      },
    });
  }

  protected async onPlay() : Promise<Card[]> {
    await EventAwaiter.awaiter({
      targets: document.querySelector("#" + AbstractActionArea.DONE_BUTTON_ID),
      type: "click",
    });

    return this.selectedCards;
  }
}
