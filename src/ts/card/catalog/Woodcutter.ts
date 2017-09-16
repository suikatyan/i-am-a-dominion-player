import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Woodcutter extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Woodcutter;
  }

  name() {
    return "木こり";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 3;
  }

  description() {
    return "[turn-bp 1][turn-cp 2]";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card: 2,
      coin: 2,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteActionEffect();
  }
}
