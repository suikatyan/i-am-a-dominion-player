import AbstractCard from 'card/AbstractCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Moat extends AbstractCard implements Action {
  cardId () {
    return CardId.Moat;
  }

  name() {
    return "堀";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 2;
  }

  description() {
    return "[turn-card 2]][line]他のプレイヤーがアタックカードを使用した時、手札からこのカードを公開できる。[br]そうした場合、あなたはそのアタックカードの影響を受けない。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
      ActionCategory.Reaction,
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

  async excute() {
    this.excuteAtionEffect();
  }
}
