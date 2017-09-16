import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Thief extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Thief;
  }

  name() {
    return "泥棒";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "他のプレイヤーは全員、自分の山札の上から２枚のカードを公開する。[br]財宝カードを公開した場合、その中の１枚をあなたが選んで廃棄する。[br]あなたはここで廃棄したカードのうち好きな枚数を獲得できる。[br]他の公開したカードはすべて捨て札にする。";
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
