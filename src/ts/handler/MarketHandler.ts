import Card from "interface/card/Card";
import Context from "context/Context";
import DI from "util/DI";
import Vue from "vue";
import CardFactory from "factory/CardFactory";
import CardComponent from "component/CardComponent";

interface marketCard {
  count: number,
  card: Card,
}

export default class MarketHandler {
  private cards: marketCard[] = [];
  private trashCards: Card[] = [];
  @DI.inject()
  private context: () => Context;
  private view: Vue;
  private trashView: Vue;

  constructor() {
    this.view = new Vue({
      el: "#market",
      data: {
        cards: this.cards,
        kingdomStartIndex: 0,
      },
      components: {
        "card-component": CardComponent,
      },
    });
    this.trashView = new Vue({
      el: "#trash",
      data: {
        cards: this.trashCards,
      },
      components: {
        "card-component": CardComponent,
      },
    });
  }

  async initialize() {
    for (const [cardId, count] of this.context().game.cardSet.allCards()) {
      const card = await CardFactory.build(cardId);
      this.cards.push({card, count});
    }
    this.view.kingdomStartIndex = this.context().game.cardSet.basicSupplyCards().size;
  }
}
