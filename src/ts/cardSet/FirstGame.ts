import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";

export default class FirstGame extends AbstractCardSet implements CardSet {
  startCards() : Map<CardId, number> {
    return super.startCards();
  }

  basicSupplyCards(playerCount: number) : Map<CardId, number> {
    return super.basicSupplyCards(playerCount);
  }

  kingdomCards() : Map<CardId, number> {
    return new Map([
      [CardId.Celler,     10],
      [CardId.Market,     10],
      [CardId.Woodcutter, 10],
      [CardId.Militia,    10],
      [CardId.Mine,       10],
      [CardId.Moat,       10],
      [CardId.Remodel,    10],
      [CardId.Smithy,     10],
      [CardId.Village,    10],
      [CardId.Workshop,   10],
    ]);
  }

  allCards() : Set<CardId> {
    return super.allCards();
  }
}
