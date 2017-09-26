import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";
import {CardFilter} from "util/CardFilter";
import WorkshopArea from "actionArea/area/WorkshopArea";

export default class Workshop extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Workshop;
  }

  name() {
    return "工房";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 3;
  }

  description() {
    return "コスト最大４コインまでのカード１枚を獲得する。";
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
    const marketHandler = this.marketHandler();

    const cardsInMarket = CardFilter.filter(
      marketHandler.getMarketCardsWithoutCount(),
      {maxCost: 4},
    );
    const availableCardsInMarket = cardsInMarket.filter(card => {
      return !marketHandler.isSoldout(card.cardId());
    });

    const area2 = new WorkshopArea(availableCardsInMarket);
    area2.start();
    const [selectedCardToDiscarded] = await area2.play();
    area2.end();

    this.context().turn.discarded.push(await marketHandler.deal(selectedCardToDiscarded.cardId()));
  }
}
