import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";
import CardSetId from "list/CardSetId";

export default class SizeDistortion extends AbstractCardSet implements CardSet {
  id() {
    return CardSetId.SizeDistortion;
  }

  name() {
    return "サイズ変形";
  }

  async kingdomCards() {
    const cards = await this.sort([
      [CardId.Cellar,     10],
      [CardId.Chapel,     10],
      [CardId.Feast,      10],
      [CardId.Gardens,    this.playerCount === 2 ? 8 : 12],
      [CardId.Laboratory, 10],
      [CardId.Thief,      10],
      [CardId.Village,    10],
      [CardId.Witch,      10],
      [CardId.Woodcutter, 10],
      [CardId.Workshop,   10],
    ]);

    return new Map(cards);
  }
}
