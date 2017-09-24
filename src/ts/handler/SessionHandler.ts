import PlayerHandler from 'handler/PlayerHandler';
import TurnHandler from "handler/TurnHandler";
import MarketHandler from "handler/MarketHandler";
import DI from "util/DI";
import CardId from "list/CardId";

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
    while (this.canContinue()) {
      this.playerHandler().next();
      const turn = new TurnHandler();
      await turn.start();
    }
    alert("ゲーム終了！");
  }

  canContinue() : boolean {
    const SoldOutCardIds = this.marketHandler().getSoldOutCardIds();

    // 「属州」などの特定のカードが在庫切れなら、ゲーム終了
    const condition1 = SoldOutCardIds.some((cardId) => {
      switch(cardId) {
        case CardId.Province:
          return true;
      }

      return false;
    });
    if (condition1) {
      return false;
    }

    // 「属州」などの特定のカード以外が3つ以上在庫切れなら、ゲーム終了
    const condition2 = SoldOutCardIds.filter((cardId) => {
      switch(cardId) {
        case CardId.Province:
          return false;
      }

      return true;
    }).length >= 3;
    if (condition2) {
      return false;
    }

    return true;
  }
}
