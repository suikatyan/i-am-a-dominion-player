import CardId from "list/CardId";

export default interface CardSet {
  startCards: () => Map<CardId, number>;
  basicSupplyCards: (playerCount: number) => Map<CardId, number>;
  kingdomCards: () => Map<CardId, number>;
  allCards: () => Set<CardId>;
}
