import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";
import CardSetId from "list/CardSetId";
import Dice from "util/Dice";
import CardFactory from "factory/CardFactory";

export default class Random extends AbstractCardSet implements CardSet {
  id() {
    return CardSetId.Random;
  }

  name() {
    return "ランダム";
  }

  async kingdomCards() {
    return new Map(
      await this.sort(await this.selectRandomCards()),
    );
  }

  private async selectRandomCards() {
    const cardConfig:[CardId, number][] = [];
    const pickedCardId: CardId[] = [];

    while (cardConfig.length < 10) {
      const cardId: CardId = Dice.selectEnum<CardId>(CardId);

      if (pickedCardId.includes(cardId)) {
        continue;
      }
      pickedCardId.push(cardId);

      const card = await CardFactory.build(cardId);
      if (!card.isKingdomCard()) {
        continue;
      }

      let count = 10;
      switch (cardId) {
        case CardId.Gardens:
          count = this.playerCount === 2 ? 8 : 12;
          break;
      }

      cardConfig.push([cardId, count]);
    }

    return cardConfig;
  }
}
