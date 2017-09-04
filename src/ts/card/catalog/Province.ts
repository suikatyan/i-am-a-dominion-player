import AbstractCard from 'card/AbstractCard';
import Victory from "interface/card/Victory";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Province extends AbstractCard implements Victory {
  cardId () {
    return CardId.Province;
  }

  name() {
    return "属州";
  }

  category() {
    return CardCategory.Victory;
  }

  cost() {
    return 8;
  }

  description() {
    return "[vp 6]。";
  }

  victoryPoint() {
    return 6;
  }

  isKingdomCard() {
    return false;
  }
}
