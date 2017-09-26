import Card from "interface/card/Card";
import Vue from 'vue';
import AbstractActionArea from "actionArea/AbstractActionArea";
import EventAwaiter from "util/EventAwaiter";
import MarketAreaComponent from "component/area/MarketAreaComponent";

export default class WorkshopArea extends AbstractActionArea {
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
          description: "コスト最大４コインまでのカード１枚を選んでください。そのカードを獲得します。",
          selectedCards: this.selectedCards,
          count: {
            max: 1,
            min: 1,
          },
          kingdomStartIndex: this.cards.reduce((count, card) => card.isKingdomCard() ? count : ++count, 1),
        },
      },
      components: {
        "area-component": MarketAreaComponent,
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
