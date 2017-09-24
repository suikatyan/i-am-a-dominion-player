import CardId from "list/CardId";
import PlayerHandler from 'handler/PlayerHandler';
import DI from "util/DI";
import CardFactory from "factory/CardFactory";
import Card from "interface/card/Card";
import CardSorter from "util/CardSorter";

export default abstract class AbstractCardSet {
  @DI.inject()
  private playerHandler: () => PlayerHandler;
  protected playerCount: number;

  constructor() {
    this.playerCount = this.playerHandler().count();
  }

  startCards() : Map<CardId, number> {
    return new Map([
      [CardId.Copper, 7],
      [CardId.Estate, 3],
    ]);
  }

  basicSupplyCards() : Map<CardId, number> {
    const victoryCount = this.playerCount === 2 ? 8 : 12;
    // const curseCount = this.playerCount * 10 - 10; // TODO: プレイヤー人数に関係なく固定値とする。playerCountが機能していないため
    const curseCount = 30;

    return new Map([
      [CardId.Copper,   60],
      [CardId.Silver,   40],
      [CardId.Gold,     30],
      [CardId.Estate,   victoryCount],
      [CardId.Duchy,    victoryCount],
      [CardId.Province, victoryCount],
      [CardId.Curse,    curseCount],
    ]);
  }

  abstract async kingdomCards() : Promise<Map<CardId, number>>;

  async allCards() : Promise<Map<CardId, number>> {
    const a = Array.from(this.basicSupplyCards());
    const b = Array.from(await this.kingdomCards());
    return new Map(a.concat(b));
  }

  protected async sort(cards: [CardId, number][]) {
    const builtCards: Card[] = [];
    for (const [cardId] of cards) {
      builtCards.push(await CardFactory.build(cardId));
    }

    CardSorter.sort(builtCards, {isAscending: true, keys: ["cost"]});

    return builtCards.map((builtCard) => {
      return cards.find(([cardId]) => builtCard.cardId() === cardId);
    }) as [CardId, number][];
  }
}
