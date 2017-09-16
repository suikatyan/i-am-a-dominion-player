import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Chancellor extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Chancellor;
  }

  name() {
    return "宰相";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 3;
  }

  description() {
    return "[turn-cp 1]あなたの山札のカードすべてを、即座に捨て札に置くことができる。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      coin: 1,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteActionEffect();
  }
}
