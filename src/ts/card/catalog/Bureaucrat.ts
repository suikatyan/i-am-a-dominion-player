import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Bureaucrat extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Bureaucrat;
  }

  name() {
    return "役人";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "銀貨１枚を獲得し、あなたの山札の上に置く。[br]他のプレイヤーは全員、自分の手札から勝利点カード１枚を公開し、自分の山札の上に置く。（手札に勝利点カードがない場合、手札を公開する。）";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
      ActionCategory.Attack,
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
