import Card from "interface/card/Card";
import Vue from 'vue';

export default abstract class AbstractActionArea {
  static AREA_ID = "action-area";
  static DONE_BUTTON_ID = "action-area-done-button";

  protected view: Vue;

  constructor() {
    this.createArea();
  }

  async play() : Promise<Card[]> {
    const cards = await this.onPlay();
    this.destoryArea();
    return cards;
  }

  protected abstract async onPlay() : Promise<Card[]>;

  private createArea() {
    const div = document.createElement("div");
    div.id = AbstractActionArea.AREA_ID;
    div.innerHTML = "<area-component :parameters='parameters'></area-component>"
    document.body.appendChild(div);
  }

  private destoryArea() {
    const element = document.querySelector("#" + AbstractActionArea.AREA_ID);
    if (element !== null && element.parentNode !== null) {
      element.parentNode.removeChild(element);
    }
  }
}
