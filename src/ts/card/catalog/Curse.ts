import AbstractCard from 'card/AbstractCard';
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import CurseInterface from "interface/card/Curse";

export default class Curse extends AbstractCard implements CurseInterface {
  value() {
    return 1;
  }

  cardId() {
    return CardId.Curse;
  }

  name() {
    return "呪い";
  }

  category() {
    return CardCategory.Curse;
  }

  cost() {
    return 0;
  }

  description() {
    return "[vp -1]。";
  }

  victoryPoint() {
    return -1;
  }

  isKingdomCard() {
    return false;
  }
}
