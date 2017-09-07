import Vue from "vue";

export default class NotificationHandler {
  private view: Vue;

  constructor() {
    this.view = new Vue({
      el: "#information",
      data: {
        text: "",
      },
    });
  }

  say(text: string) {
    this.view.text = this.convert(text);
  }

  convert(text: string) {
    return text.replace(/\r?\n/g, "<br>");
  }
}
