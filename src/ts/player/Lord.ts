import Player from "interface/player/Player";
import AbstractPlayer from "player/AbstractPlayer";

export default class Lord extends AbstractPlayer implements Player {
  isRobot() {
    return false;
  }

  name() {
    return "あなた";
  }
}
