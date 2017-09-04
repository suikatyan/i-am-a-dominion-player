import PlayerHandler from 'handler/PlayerHandler';
import TurnHandler from "handler/TurnHandler";
import MarketHandler from "handler/MarketHandler";
import DI from "util/DI";

interface SessionConfig {
  playerCount: number;
  robotCount: number;
}

export default class Session {
  @DI.inject()
  private playerHandler: () => PlayerHandler;
  @DI.inject()
  private marketHandler: () => MarketHandler;

  async prepare(config: SessionConfig) {
    await this.playerHandler().createPlayers(config.playerCount, config.robotCount);
    await this.marketHandler().initialize();
  }

  async start() {
    while (true) {
      const turn = new TurnHandler();
      await turn.start();

      if (this.canContinue()) {
        break;
      }
    }
  }

  canContinue() : boolean {
    return true;
  }
}
