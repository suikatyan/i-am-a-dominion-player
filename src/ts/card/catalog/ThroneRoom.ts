import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class ThroneRoom extends AbstractActionCard implements Action {
  cardId() {
    return CardId.ThroneRoom;
  }

  name() {
    return "玉座の間";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "あなたの手札のアクションカード１枚を選ぶ。[br]そのカードを２回使用する。";
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
