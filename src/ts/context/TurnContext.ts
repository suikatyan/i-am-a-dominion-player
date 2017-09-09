import Player from "interface/player/Player";
import DI from "util/DI";
import PlayerHandler from 'handler/PlayerHandler';
import PropertyHandler from 'handler/PropertyHandler';
import Hand from "property/Hand";
import Field from "property/Field";
import TurnPointHandler from "handler/TurnPointHandler";

export default class TurnContext {
  @DI.inject()
  private playerHandler: () => PlayerHandler;

  turnPointHandler: TurnPointHandler;
  currentPlayer: Player;
  otherPlayers: Player[];
  hand: Hand;
  field: Field;
  propertyHandler: PropertyHandler;

  initialize() {
    const currentPlayer = this.playerHandler().getNextPlayer();
    this.turnPointHandler = new TurnPointHandler();
    this.currentPlayer = currentPlayer;
    this.otherPlayers = this.playerHandler().getOtherPlayers();
    this.hand = currentPlayer.getProperty().getHand();
    this.field = currentPlayer.getProperty().getField();
    this.propertyHandler = currentPlayer.getProperty();
  }
}
