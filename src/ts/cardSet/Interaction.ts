import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";
import CardSetId from "list/CardSetId";

export default class Interaction extends AbstractCardSet implements CardSet {
  id() {
    return CardSetId.Interactoin;
  }

  name() {
    return "相互作用";
  }

  async kingdomCards() {
    const cards = await this.sort([
      [CardId.Bureaucrat,  10],
      [CardId.Chancellor,  10],
      [CardId.CouncilRoom, 10],
      [CardId.Militia,     10],
      [CardId.Mine,        10],
      [CardId.Moat,        10],
      [CardId.Remodel,     10],
      [CardId.Smithy,      10],
      [CardId.Village,     10],
      [CardId.Workshop,    10],
    ]);

    return new Map(cards);
  }
}
