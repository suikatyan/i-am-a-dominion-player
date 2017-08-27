import CardId from "list/CardId";

export default abstract class AbstractCardSet {
  startCards() : Map<CardId, number> {
    return new Map([
      [CardId.Copper, 7],
      [CardId.Estate, 3],
    ]);
  }

  basicSupplyCards(playerCount: number) : Map<CardId, number> {
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

  allCards() : Set<CardId> {
    const a = Array.from(this.basicSupplyCards(2).keys());
    const b = Array.from(this.kingdomCards().keys());
    return new Set(a.concat(b));
  }
}
