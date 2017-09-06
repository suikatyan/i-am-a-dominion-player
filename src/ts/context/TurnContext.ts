import Player from "interface/player/Player";
import DI from "util/DI";
import PlayerHandler from 'handler/PlayerHandler';
import PropertyHandler from 'handler/PropertyHandler';
import Hand from "property/Hand";

export default class TurnContext {
  @DI.inject()
  private playerHandler: () => PlayerHandler;

  actionPoint: number;
  buyPoint: number;
  currentPlayer: Player;
  otherPlayers: Player[];
  hand: Hand;
  propertyHandler: PropertyHandler;

  initialize() {
    const currentPlayer = this.playerHandler().getNextPlayer();
    this.actionPoint = 1;
    this.buyPoint = 1;
    this.currentPlayer = currentPlayer;
    this.otherPlayers = this.playerHandler().getOtherPlayers();
    this.hand = currentPlayer.getProperty().getHand();
    this.propertyHandler = currentPlayer.getProperty();
  }
}
