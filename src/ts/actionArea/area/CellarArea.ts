import Card from "interface/card/Card";
import Vue from 'vue';
import AbstractActionArea from "actionArea/AbstractActionArea";
import DefaultAreaComponent from "component/area/DefaultAreaComponent";

export default class CellarArea extends AbstractActionArea {
  protected cards: Card[] = [];

  constructor(cards: Card[]) {
    super();

    this.cards = cards;
    this.view = new Vue({
      el: "#" + AbstractActionArea.AREA_ID,
      data: {
        cards: this.cards,
      },
      components: {
        "area-component": DefaultAreaComponent,
      },
    });
  }

  protected async onPlay() : Promise<Card[]> {
    return this.cards;
  }
}
