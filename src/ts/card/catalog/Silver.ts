import AbstractCard from 'card/AbstractCard';
import Treasure from "interface/card/Treasure";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Silver extends AbstractCard implements Treasure {
  value() {
    return 2;
  }

  cardId() {
    return CardId.Silver;
  }

  name() {
    return "銀貨";
  }

  category() {
    return CardCategory.Treasure;
  }

  cost() {
    return 3;
  }

  description() {
    return "[treasure 2]";
  }

  isKingdomCard() {
    return false;
  }
}
