import AbstractCard from 'card/AbstractCard';
import Victory from "interface/card/Victory";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Gardens extends AbstractCard implements Victory {
  cardId() {
    return CardId.Gardens;
  }

  name() {
    return "庭園";
  }

  category() {
    return CardCategory.Victory;
  }

  cost() {
    return 4;
  }

  description() {
    return "あなたの山札のカード１０枚（端数切り捨て）につき勝利点１を得る。";
  }

  victoryPoint() {
    return 0;
  }

  isKingdomCard() {
    return true;
  }
}
