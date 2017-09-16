import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Adventurer extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Adventurer;
  }

  name() {
    return "冒険者";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 6;
  }

  description() {
    return "あなたの山札から財宝カード２枚が公開されるまで、カードを公開する。[br]公開した財宝カード２枚を手札に加え、他の公開したカードは捨て札に置く。";
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
    this.excuteActionEffect();
  }
}
