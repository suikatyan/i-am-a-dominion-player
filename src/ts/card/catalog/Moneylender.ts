import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Moneylender extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Moneylender;
  }

  name() {
    return "金貸し";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "あなたの手札から銅貨１枚を廃棄する。そうした場合、+[turn-cp-inline 3]を使用できる。";
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

  async excute() {
    this.excuteActionEffect();
  }
}
