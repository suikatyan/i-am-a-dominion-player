import AbstractActionCard from 'card/AbstractActionCard';
import Action from "interface/card/Action";
import CardId from "list/CardId";
import CardCategory from "list/CardCategory";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";
import AdventurerArea from "actionArea/area/AdventurerArea";
import Card from "interface/card/Card"
import {CardFilter, FilterKey} from "util/CardFilter";
import Sleeper from "util/Sleeper";

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

  protected async onExcute() {
    const cards: Card[] = [];
    const area = new AdventurerArea(cards);
    area.start();

    while (true) {
      if (CardFilter.filter(cards, {include: [FilterKey.Treasure]}).length >= 2) {
        break;
      }

      const drawCard = this.context().turn.propertyHandler.openDeck();
      if (drawCard.length === 0) {
        break;
      }

      cards.push(drawCard[0]);
      await Sleeper(1000);

    }

    area.end();

    for (const card of cards) {
      if (card.category() === CardCategory.Treasure) {
        this.context().turn.hand.push(card);
      } else {
        this.context().turn.discarded.push(card);
      }
    }
  }
}
