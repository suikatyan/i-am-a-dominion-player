import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Library extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Library;
  }

  name() {
    return "書庫";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 5;
  }

  description() {
    return "あなたの手札が７枚になるまでカードを引く。[br]この方法で引いたアクションカードを脇に置いてもよい。（７枚には数えない。）脇に置いたカードは、このアクションの後、捨て札にする。";
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
