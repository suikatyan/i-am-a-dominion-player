import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";

export default class FirstGame extends AbstractCardSet implements CardSet {
  async kingdomCards() {
    const cards = await this.sort([
      [CardId.Cellar,     10],
      [CardId.Market,     10],
      [CardId.Woodcutter, 10],
      [CardId.Militia,    10],
      [CardId.Mine,       10],
      [CardId.Moat,       10],
      [CardId.Remodel,    10],
      [CardId.Smithy,     10],
      [CardId.Village,    10],
      [CardId.Workshop,   10],
    ]);

    return new Map(cards);
  }
}
