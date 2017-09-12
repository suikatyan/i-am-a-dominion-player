import Vue from "vue";

class TurnPoint {
  private point: number;
  private defaultPoint: number;

  constructor(number: number = 1) {
    this.defaultPoint = number;
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

  initialize() {
    this.point = this.defaultPoint;
  }
}

const actionPoint = new TurnPoint();
const buyPoint = new TurnPoint();
const coinPoint = new TurnPoint(0);
const usedCoin = new TurnPoint(0);

const view = new Vue({
  el: "#points",
  data: {
    actionPoint,
    buyPoint,
    coinPoint,
  },
});

export default class TurnPointHandler {
  action: TurnPoint;
  buy: TurnPoint;
  coin: TurnPoint;
  usedCoin: TurnPoint;
  private view: Vue;

  constructor() {
    this.view = view;

    this.action = actionPoint;
    this.action.initialize();

    this.buy = buyPoint;
    this.buy.initialize();

    this.coin = coinPoint;
    this.coin.initialize();

    this.usedCoin = usedCoin;
    this.usedCoin.initialize();
  }
}
