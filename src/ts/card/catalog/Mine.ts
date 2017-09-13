import AbstractCard from 'card/AbstractCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Mine extends AbstractCard implements Action {
  cardId () {
    return CardId.Mine;
  }

  name() {
    return "鉱山";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 5;
  }

  description() {
    return "あなたの手札の財宝カード１枚を廃棄する。[br]廃棄した財宝よりもコストが最大３コイン多い財宝カード１枚を獲得し、あなたの手札に加える。";
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

  async excute() {
    this.excuteAtionEffect();
  }
}
