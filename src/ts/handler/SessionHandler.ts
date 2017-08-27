import PlayerHandler from 'handler/PlayerHandler';
import TurnHandler from "handler/TurnHandler";
import DI from "util/DI";

interface SessionConfig {
  playerCount: number;
  robotCount: number;
}

export default class Session {
  @DI.inject()
  private playerHandler: () => PlayerHandler;

  async prepare(config: SessionConfig) {
    await this.playerHandler().createPlayers(config.playerCount, config.robotCount);
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
