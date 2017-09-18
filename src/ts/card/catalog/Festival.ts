import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Festival extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Festival;
  }

  name() {
    return "祝祭";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 5;
  }

  description() {
    return "[turn-ap 2][turn-bp 1][turn-cp 2]";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      coin:   2,
      action: 2,
      buy:    1,
    });
  }

  isKingdomCard() {
    return true;
  }

  protected async onExcute() {

  }
}
