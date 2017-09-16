import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class CouncilRoom extends AbstractActionCard implements Action {
  cardId() {
    return CardId.CouncilRoom;
  }

  name() {
    return "議事堂";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "[turn-card 4][turn-cp 1]他のプレイヤー全員は、カードを１枚引く。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card: 4,
      buy: 1,
    });
  }

  isKingdomCard() {
    return true;
  }

  async excute() {
    this.excuteActionEffect();
  }
}
