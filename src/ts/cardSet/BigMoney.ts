import AbstractCardSet from "cardSet/AbstractCardSet";
import CardSet from "interface/cardSet/CardSet";
import CardId from "list/CardId";
import CardSetId from "list/CardSetId";

export default class BigMoney extends AbstractCardSet implements CardSet {
  id() {
    return CardSetId.BigMoney;
  }

  name() {
    return "ビッグ・マネー";
  }

  async kingdomCards() {
    const cards = await this.sort([
      [CardId.Adventurer,  10],
      [CardId.Bureaucrat,  10],
      [CardId.Chancellor,  10],
      [CardId.Chapel,      10],
      [CardId.Feast,       10],
      [CardId.Laboratory,  10],
      [CardId.Market,      10],
      [CardId.Mine,        10],
      [CardId.Moneylender, 10],
      [CardId.ThroneRoom,  10],
    ]);

    return new Map(cards);
  }
}
