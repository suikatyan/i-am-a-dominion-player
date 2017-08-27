import AbstractApplication from 'application/AbstractApplication';
import SessionHandler from "handler/SessionHandler";
import Context from "context/Context";
import DI from "util/DI";
import CardSet from "interface/cardSet/CardSet";
import CardSetFactory from "factory/CardSetFactory";
import Util from "util/Util";

export default class Dominion extends AbstractApplication {
  @DI.inject()
  private context: () => Context;
  private sessionHandler: SessionHandler;

  async initialize() {
    this.context().game.cardSet = await this.buildCardSet();
  }

  private async buildCardSet() : Promise<CardSet> | never {
    const cardSetName = Util.getUrlParameters("cardset");

    if (typeof cardSetName === "string") {
      return await CardSetFactory.build(cardSetName);
    } else {
      throw new Error("Dominion buildCardSet error: カードセットの名前が不正です。");
    }

  }

  async startSession() {
    this.sessionHandler = new SessionHandler();
    await this.sessionHandler.prepare({
      playerCount: 1,
      robotCount: 3,
    });
    await this.sessionHandler.start();
  }
}
