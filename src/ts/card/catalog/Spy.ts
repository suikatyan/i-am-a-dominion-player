import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default class Spy extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Spy;
  }

  name() {
    return "密偵";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "[turn-card 1][turn-ap 1]各プレイヤー（あなたも含む）は、自分の山札の一番上のカードを公開し、そのカードを捨て札にするかそのまま戻すかをあなたが選ぶ。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
      ActionCategory.Attack,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      card:   1,
      action: 1,
    });
  }

  isKingdomCard() {
    return true;
  }

  protected async onExcute() {

  }
}
