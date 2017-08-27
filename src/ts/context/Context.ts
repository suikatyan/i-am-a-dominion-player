import TurnContext from "context/TurnContext";
import GameContext from "context/GameContext";

export default class Context {
  game = new GameContext();
  turn = new TurnContext();
}
