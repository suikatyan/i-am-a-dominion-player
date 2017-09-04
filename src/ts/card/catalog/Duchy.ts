import AbstractCard from 'card/AbstractCard';
import Victory from "interface/card/Victory";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Duchy extends AbstractCard implements Victory {
  cardId () {
    return CardId.Duchy;
  }

  name() {
    return "公領";
  }

  category() {
    return CardCategory.Victory;
  }

  cost() {
    return 5;
  }

  description() {
    return "[vp 3]。";
  }

  victoryPoint() {
    return 3;
  }

  isKingdomCard() {
    return false;
  }
}
