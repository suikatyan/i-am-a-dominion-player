import Player from "interface/player/Player";
import DI from "util/DI";
import PlayerHandler from 'handler/PlayerHandler';
import Card from "interface/card/Card";

export default class TurnContext {
  @DI.inject()
  private playerHandler: () => PlayerHandler;

  actionPoint: number;
  buyPoint: number;
  currentPlayer: Player;
  otherPlayers: Player[];
  hand: Card[];

  initialize() {
    const currentPlayer = this.playerHandler().getNextPlayer();
    this.actionPoint = 1;
    this.buyPoint = 1;
    this.currentPlayer = currentPlayer;
    this.otherPlayers = this.playerHandler().getOtherPlayers();
    this.hand = currentPlayer.getProperty().getHand();
  }
}
