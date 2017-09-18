import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";
import CellarArea from "actionArea/area/CellarArea";

export default class Cellar extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Cellar;
  }

  name() {
    return "地下貯蔵庫";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 2;
  }

  description() {
    return "[turn-ap 1]好きな枚数のカードを捨て札にし、同じ枚数のカードを引く。";
  }

  actionCategory() {
    return new Set([
      ActionCategory.Action,
    ]);
  }

  effect() {
    return new ActionEffectCollection({
      action: 1,
    });
  }

  isKingdomCard() {
    return true;
  }

  protected async onExcute() {
    const propertyHandler = this.context().turn.propertyHandler;
    const area = new CellarArea(this.context().turn.hand.getCards());
    const selectedCards = await area.play();

    const selectedCardsLength = selectedCards.length;
    propertyHandler.discard(selectedCards);
    propertyHandler.draw(selectedCardsLength);
  }
}
