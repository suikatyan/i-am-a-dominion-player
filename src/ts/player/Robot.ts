import Player from "interface/player/Player";
import AbstractPlayer from "player/AbstractPlayer";

export default class Robot extends AbstractPlayer implements Player {
  private _name: string;

  constructor(playerIndex: number) {
    super(playerIndex);
    this._name = "ボット" + this.playerIndex;
  }

  isRobot() {
    return true;
  }

  name() {
    return this._name;
  }
}
