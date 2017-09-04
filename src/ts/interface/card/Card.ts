import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default interface Card {
  cardId: () => CardId;
  itemId: () => string;
  name: () => string;
  category: () => CardCategory;
  cost: () => number;
  description: () => string;
  isKingdomCard: () => boolean;
}
