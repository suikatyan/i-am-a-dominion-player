import Vue from 'vue';
import Context from "context/Context";
import DI from "util/DI";

export default abstract class AbstractActionArea {
  static AREA_ID = "action-area";
  static DONE_BUTTON_ID = "action-area-done-button";

  protected view: Vue;
  @DI.inject()
  protected context: () => Context;

  start() {
    this.createArea();
  }

  end() {
    this.destoryArea();
  }

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
