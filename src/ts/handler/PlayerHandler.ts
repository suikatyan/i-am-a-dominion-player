import Player from "interface/player/Player";
import Lord from "player/Lord";
import Robot from "player/Robot";
import Vue from "vue";

export default class PlayerHandler {
  private players: Player[] = [];
  private currentPlayerIndex = -1;
  private loadView: Vue;
  private robotView: Vue;

  constructor() {
    this.loadView = new Vue({
      el: "#me",
      data: {
        players: this.players,
      },
    });
    this.robotView = new Vue({
      el: "#other-players",
      data: {
        players: this.players,
      },
    });
  }

  async createPlayers(playerCount: number = 0, robotCount: number = 0) {
    for (let i = 0; i < playerCount; i++) {
      const lord = new Lord(i + 1);
      await lord.initilize();
      this.players.push(lord);
    }

    for (let i = 0; i < robotCount; i++) {
      const robot = new Robot(i + 1);
      await robot.initilize();
      this.players.push(robot);
    }
  }

  next() {
    this.currentPlayerIndex++;
    if (this.players.length <= this.currentPlayerIndex) {
      this.currentPlayerIndex = 0;
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getOtherPlayers() {
    const output = [];
    for (let i = 0; i < this.players.length; i++) {
      if (i < this.currentPlayerIndex) {
        output.push(this.players[i]);
      } else if (i > this.currentPlayerIndex) {
        output.unshift(this.players[i])
      }
    }

    return output;
  }

  count() {
    return this.players.length;
  }
}
