import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Workshop extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Workshop;
  }

  name() {
    return "工房";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 3;
  }

  description() {
    return "コスト最大４コインまでのカード１枚を獲得する。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({});
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteActionEffect();
  }
}
