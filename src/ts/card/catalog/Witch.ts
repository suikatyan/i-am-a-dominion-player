import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Witch extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Witch;
  }

  name() {
    return "魔女";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 5;
  }

  description() {
    return "[turn-card 2]他のプレイヤーは全員、呪いカードを１枚ずつ獲得する。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
      ActionCategory.Attack,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card: 2,
    });
  }

  isKingdomCard() {
    return true;
  }

  protected async onExcute() {

  }
}
