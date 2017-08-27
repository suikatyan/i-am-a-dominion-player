import AbstractCard from 'card/AbstractCard';
import Treasure from "interface/card/Treasure";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";

export default class Copper extends AbstractCard implements Treasure {
  value() {
    return 1;
  }

  cardId () {
    return CardId.Copper;
  }

  name() {
    return "銅貨";
  }

  category() {
    return CardCategory.Treasure;
  }

  cost() {
    return 0;
  }

  description() {
    return "";
  }
}
