import Card from "interface/card/Card";
import Vue from 'vue';

export default abstract class AbstractActionArea {
  static AREA_ID = "action-area";

  protected view: Vue;

  constructor() {
    this.createDom();
  }

  async play() : Promise<Card[]> {
    const cards = await this.onPlay();
    // this.destoryDom();
    return cards;
  }

  protected abstract async onPlay() : Promise<Card[]>;

  private createDom() {
    const div = document.createElement("div");
    div.id = AbstractActionArea.AREA_ID;
    div.innerHTML = "<area-component :cards='cards'></area-component>"
    document.body.appendChild(div);
  }

  private destoryDom() {
    const element = document.querySelector("#" + AbstractActionArea.AREA_ID);
    if (element !== null && element.parentNode !== null) {
      element.parentNode.removeChild(element);
    }
  }
}
