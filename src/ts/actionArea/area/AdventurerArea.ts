import Card from "interface/card/Card";
import Vue from 'vue';
import AbstractActionArea from "actionArea/AbstractActionArea";
import CardsAreaComponent from "component/area/CardsAreaComponent";
import Adventurer from "card/catalog/Adventurer";

export default class AdventurerArea extends AbstractActionArea {
  private cards: Card[] = [];

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
          source: new Adventurer(),
          description: "財宝カードが2枚出るまで山札から公開します。その財宝カードは手札に加え、他のカードは捨て札にします。",
        },
      },
      components: {
        "area-component": CardsAreaComponent,
      },
    });
  }
}
