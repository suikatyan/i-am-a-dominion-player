import CardId from "list/CardId";

export default interface CardSet {
  startCards: () => Map<CardId, number>;
  basicSupplyCards: () => Map<CardId, number>;
  kingdomCards: () => Map<CardId, number>;
  allCards: () => Map<CardId, number>;
}
