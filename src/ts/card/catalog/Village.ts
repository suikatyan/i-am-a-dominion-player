import AbstractCard from 'card/AbstractCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Village extends AbstractCard implements Action {
  cardId () {
    return CardId.Village;
  }

  name() {
    return "村";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 3;
  }

  description() {
    return "[turn-card 1][turn-ap 2]";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card: 1,
      action: 2,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteAtionEffect();
  }
}
