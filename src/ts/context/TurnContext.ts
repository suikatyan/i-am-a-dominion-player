import Player from "interface/player/Player";
import DI from "util/DI";
import PlayerHandler from 'handler/PlayerHandler';
import PropertyHandler from 'handler/PropertyHandler';
import Hand from "property/Hand";
import Field from "property/Field";
import Deck from "property/Deck";
import Discarded from "property/Discarded";
import TurnPointHandler from "handler/TurnPointHandler";

export default class TurnContext {
  @DI.inject()
  private playerHandler: () => PlayerHandler;

  turnPointHandler: TurnPointHandler;
  currentPlayer: Player;
  otherPlayers: Player[];
  hand: Hand;
  field: Field;
  deck: Deck;
  discarded: Discarded;
  propertyHandler: PropertyHandler;

  initialize() {
    this.turnPointHandler = new TurnPointHandler();

    const currentPlayer = this.playerHandler().getCurrentPlayer();
    this.currentPlayer = currentPlayer;
    this.otherPlayers = this.playerHandler().getOtherPlayers();

    const propertyHandler = currentPlayer.getProperty();
    this.propertyHandler = propertyHandler;
    this.hand = propertyHandler.getHand();
    this.field = propertyHandler.getField();
    this.deck = propertyHandler.getDeck();
    this.discarded = propertyHandler.getDiscarded();
  }
}
