import Card from "interface/card/Card";
import CardId from "list/CardId";
import Context from "context/Context";
import DI from "util/DI";
import Vue from "vue";
import CardFactory from "factory/CardFactory";
import CardComponent from "component/CardComponent";
import CardWithCountComponent from "component/CardWithCountComponent";

export interface MarketCard {
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
    for (const [cardId, count] of await this.context().game.cardSet.allCards()) {
      const card = await CardFactory.build(cardId);
      this.cards.push({card, count});
    }
    this.view.kingdomStartIndex = this.context().game.cardSet.basicSupplyCards().size;
  }

  getMarketCards() {
    return this.cards;
  }

  getMarketCardsWithoutCount() {
    return this.cards.map(marketCard => marketCard.card);
  }

  async deal(cardId: CardId) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].card.cardId() === cardId) {
        this.cards[i].count--;
      }
    }

    return await CardFactory.build(cardId);
  }

  isSoldout(cardId: CardId) {
    const marketCard = this.cards.find(marketCard => marketCard.card.cardId() === cardId);
    if (marketCard) {
      return marketCard.count <= 0;
    }

    throw new Error(`マーケットに${cardId}はありません。`);
  }

  getSoldOutCardIds() {
    const cardIds: CardId[] = [];
    for (const {card, count} of this.cards) {
      if (count === 0) {
        cardIds.push(card.cardId());
      }
    }

    return cardIds;
  }

  getTrash() {
    return this.trashCards;
  }
}
