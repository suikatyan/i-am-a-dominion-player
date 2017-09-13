import AbstractCard from 'card/AbstractCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Cellar extends AbstractCard implements Action {
  cardId () {
    return CardId.Cellar;
  }

  name() {
    return "地下貯蔵庫";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 2;
  }

  description() {
    return "[turn-ap 1]好きな枚数のカードを捨て札にし、同じ枚数のカードを引く。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      action: 1,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {

  }
}
