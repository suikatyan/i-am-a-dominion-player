import Vue from "vue";

class TurnPoint {
  private point: number;

  constructor(number: number = 1) {
    this.point = number;
  }

  get() {
    return this.point;
  }

  set(number: number) {
    this.point = number;
  }

  increase(count = 1) {
    this.point += count;
  }

  decrease(count = 1) {
    this.point -= count;
  }
}


let needView = true;

export default class TurnPointHandler {
  action = new TurnPoint();
  buy = new TurnPoint();
  coin = new TurnPoint(0);
  private view: Vue;

  constructor() {
    if (needView) {
      needView = false;
      this.view = new Vue({
        el: "#points",
        data: {
          actionPoint: this.action.get(),
          buyPoint: this.buy.get(),
          coinPoint: this.coin.get(),
        },
      });
    }
  }
}