import CardId from "list/CardId";
import PlayerHandler from 'handler/PlayerHandler';
import DI from "util/DI";

export default abstract class AbstractCardSet {
  @DI.inject()
  private playerHandler: () => PlayerHandler;

  startCards() : Map<CardId, number> {
    return new Map([
      [CardId.Copper, 7],
      [CardId.Estate, 3],
    ]);
  }

  basicSupplyCards() : Map<CardId, number> {
    const playerCount = this.playerHandler().count();
    const victoryCount = playerCount === 2 ? 8 : 12;
    const curseCount = playerCount * 2 - 10;

    return new Map([
      [CardId.Copper,   60],
      [CardId.Silver,   40],
      [CardId.Gold,     30],
      [CardId.Estate,   victoryCount],
      [CardId.Duchy,    victoryCount],
      [CardId.Province, victoryCount],
      [CardId.Curse,    curseCount],
    ]);
  }

  abstract kingdomCards() : Map<CardId, number>;

  allCards() : Map<CardId, number> {
    const a = Array.from(this.basicSupplyCards());
    const b = Array.from(this.kingdomCards());
    return new Map(a.concat(b));
  }
}
