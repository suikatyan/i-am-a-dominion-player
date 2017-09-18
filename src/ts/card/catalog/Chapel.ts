import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Chapel extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Chapel;
  }

  name() {
    return "礼拝堂";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 2;
  }

  description() {
    return "あなたの手札から最大４枚までのカードを、廃棄する。";
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

  protected async onExcute() {

  }
}
