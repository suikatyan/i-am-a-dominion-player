import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Laboratory extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Laboratory;
  }

  name() {
    return "研究所";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 5;
  }

  description() {
    return "[turn-card 2][turn-ap 1]";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      action: 1,
      card: 1,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteActionEffect();
  }
}
