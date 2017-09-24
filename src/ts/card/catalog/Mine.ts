import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";
import MineArea1 from "actionArea/area/MineArea1";
import MineArea2 from "actionArea/area/MineArea2";
import {CardFilter, FilterKey} from "util/CardFilter";

export default class Mine extends AbstractActionCard implements Action {
  cardId() {
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

  protected async onExcute() {
    const hand = this.context().turn.hand;
    const marketHandler = this.marketHandler();

    const treasureCardsInHand = CardFilter.filter(hand.getCards(), {include: [FilterKey.Treasure]});
    const area1 = new MineArea1(treasureCardsInHand);
    area1.start();
    const [selectedCardToTrash] = await area1.play();
    area1.end();
    if (selectedCardToTrash === void 0) {
      return;
    }
    hand.removeCard(selectedCardToTrash.itemId());
    marketHandler.getTrash().push(selectedCardToTrash);

    const treasureCardsInMarket = CardFilter.filter(
      marketHandler.getMarketCardsWithoutCount(),
      {include: [FilterKey.Treasure], maxCost: selectedCardToTrash.cost() + 3},
    );
    const treasureAvailableCardsInMarket = treasureCardsInMarket.filter(card => {
      return !marketHandler.isSoldout(card.cardId());
    });
    const area2 = new MineArea2(treasureAvailableCardsInMarket);
    area2.start();
    const [selectedCardToHand] = await area2.play();
    area2.end();

    if (selectedCardToHand !== void 0) {
      hand.push(await marketHandler.deal(selectedCardToHand.cardId()));
    }
  }
}
