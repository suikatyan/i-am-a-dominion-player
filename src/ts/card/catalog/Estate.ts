import AbstractCard from 'card/AbstractCard';
import Victory from "interface/card/Victory";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Estate extends AbstractCard implements Victory {
  value() {
    return 1;
  }

  cardId () {
    return CardId.Estate;
  }

  name() {
    return "屋敷";
  }

  category() {
    return CardCategory.Victory;
  }

  cost() {
    return 2;
  }

  description() {
    return "";
  }

  victoryPoint() {
    return 1;
  }
}
