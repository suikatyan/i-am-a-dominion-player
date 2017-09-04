import AbstractCard from 'card/AbstractCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Market extends AbstractCard implements Action {
  cardId () {
    return CardId.Market;
  }

  name() {
    return "市場";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 5;
  }

  description() {
    return "[turn-card 1][turn-ap 1][turn-bp 1][turn-cp 1]";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card:   1,
      action: 1,
      buy:    1,
      coin:   1,
    });
  }

  isKingdomCard() {
    return true;
  }

  excute() {

  }
}
