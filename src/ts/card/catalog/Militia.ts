import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Militia extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Militia;
  }

  name() {
    return "民兵";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "[turn-cp 2]他のプレイヤーは全員、自分の手札が３枚になるまで捨て札をする。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
      ActionCategory.Attack,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      coin: 2,
    });
  }

  isKingdomCard() {
    return true;
  }

  protected async onExcute() {

  }
}
