import AbstractCard from 'card/AbstractCard';
import Treasure from "interface/card/Treasure";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Gold extends AbstractCard implements Treasure {
  value() {
    return 3;
  }

  cardId() {
    return CardId.Gold;
  }

  name() {
    return "金貨";
  }

  category() {
    return CardCategory.Treasure;
  }

  cost() {
    return 6;
  }

  description() {
    return "[treasure 2]。";
  }

  isKingdomCard() {
    return false;
  }
}
