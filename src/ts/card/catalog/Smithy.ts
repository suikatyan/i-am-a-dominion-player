import AbstractCard from 'card/AbstractCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Smithy extends AbstractCard implements Action {
  cardId () {
    return CardId.Smithy;
  }

  name() {
    return "鍛冶屋";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "[turn-card 3]";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card: 3,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteAtionEffect();
  }
}
