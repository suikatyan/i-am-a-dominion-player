import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";
import RemodelArea1 from "actionArea/area/RemodelArea1";
import RemodelArea2 from "actionArea/area/RemodelArea2";
import {CardFilter} from "util/CardFilter";

export default class Remodel extends AbstractActionCard implements Action {
  cardId() {
    return CardId.Remodel;
  }

  name() {
    return "改築";
  }

  category() {
    return CardCategory.Action;
  }

  cost() {
    return 4;
  }

  description() {
    return "あなたの手札のカード１枚を廃棄する。[br]廃棄したカードよりコストが最大２コイン多いカード１枚を獲得する。";
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
    const {hand, discarded} = this.context().turn;
    const marketHandler = this.marketHandler();

    const area1 = new RemodelArea1(hand.getCards());
    area1.start();
    const [selectedCardToTrash] = await area1.play();
    area1.end();
    if (selectedCardToTrash === void 0) {
      return;
    }
    hand.removeCard(selectedCardToTrash.itemId());
    marketHandler.getTrash().push(selectedCardToTrash);
    area1.end();

    const cardsInMarket = CardFilter.filter(
      marketHandler.getMarketCardsWithoutCount(),
      {maxCost: selectedCardToTrash.cost() + 2},
    );
    const availableCardsInMarket = cardsInMarket.filter(card => {
      return !marketHandler.isSoldout(card.cardId());
    });

    const area2 = new RemodelArea2(availableCardsInMarket);
    area2.start();
    const [selectedCardToDiscarded] = await area2.play();
    area2.end();

    if (selectedCardToDiscarded !== void 0) {
      discarded.push(await marketHandler.deal(selectedCardToDiscarded.cardId()));
    }
  }
}
