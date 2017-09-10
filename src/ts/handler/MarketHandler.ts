import Card from "interface/card/Card";
import CardId from "list/CardId";
import Context from "context/Context";
import DI from "util/DI";
import Vue from "vue";
import CardFactory from "factory/CardFactory";
import CardComponent from "component/CardComponent";
import CardWithCountComponent from "component/CardWithCountComponent";

interface MarketCard {
  count: number,
  card: Card,
}

export default class MarketHandler {
  private cards: MarketCard[] = [];
  private trashCards: Card[] = [];
  @DI.inject()
  private context: () => Context;
  private view: Vue;
  private trashView: Vue;

  static querySelectorAll() {
    return document.querySelectorAll("#market .card");
  }

  constructor() {
    this.view = new Vue({
      el: "#market",
      data: {
        cards: this.cards,
        kingdomStartIndex: 0,
      },
      components: {
        "card-component": CardWithCountComponent,
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

  getMarketCards() {
    return this.cards;
  }

  async deal(cardId: CardId) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].card.cardId() === cardId) {
        this.cards[i].count--;
      }
    }

    return await CardFactory.build(cardId);
  }
}
