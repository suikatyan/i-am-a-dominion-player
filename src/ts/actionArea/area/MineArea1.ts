import Card from "interface/card/Card";
import Vue from 'vue';
import AbstractActionArea from "actionArea/AbstractActionArea";
import EventAwaiter from "util/EventAwaiter";
import DefaultAreaComponent from "component/area/DefaultAreaComponent";

export default class MineArea1 extends AbstractActionArea {
  protected cards: Card[] = [];
  protected selectedCards: Card[] = [];

  constructor(cards: Card[]) {
    super();

    this.cards = cards;
  }

  start() {
    super.start();

    this.view = new Vue({
      el: "#" + AbstractActionArea.AREA_ID,
      data: {
        parameters: {
          cards: this.cards,
          description: "廃棄する財宝カードを1枚選んでください。それよりもコストが最大3コイン多い財宝カード1枚を手札に加えます。",
          selectedCards: this.selectedCards,
          count: {
            max: 1,
            min: this.cards.length === 0 ? 0 : 1,
          },
        },
      },
      components: {
        "area-component": DefaultAreaComponent,
      },
    });
  }

  async play() : Promise<Card[]> {
    await EventAwaiter.awaiter({
      targets: document.querySelector("#" + AbstractActionArea.DONE_BUTTON_ID),
      type: "click",
    });

    return this.selectedCards;
  }
}
