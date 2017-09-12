import CardId from "list/CardId";

export default interface CardSet {
  startCards: () => Map<CardId, number>;
  basicSupplyCards: () => Map<CardId, number>;
  kingdomCards: () => Promise<Map<CardId, number>>;
  allCards: () => Promise<Map<CardId, number>>;
}
