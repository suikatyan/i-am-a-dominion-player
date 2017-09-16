import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";
import CardSetId from "list/CardSetId";

export default class VillageSquare extends AbstractCardSet implements CardSet {
  id() {
    return CardSetId.VillageSquare;
  }

  name() {
    return "村の広場";
  }

  async kingdomCards() {
    const cards = await this.sort([
      [CardId.Bureaucrat, 10],
      [CardId.Cellar,     10],
      [CardId.Festival,   10],
      [CardId.Library,    10],
      [CardId.Market,     10],
      [CardId.Remodel,    10],
      [CardId.Smithy,     10],
      [CardId.Witch,      10],
      [CardId.ThroneRoom, 10],
      [CardId.Village,    10],
    ]);

    return new Map(cards);
  }
}
