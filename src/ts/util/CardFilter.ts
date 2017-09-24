import Card from "interface/card/Card";
import CardCategory from "list/CardCategory";

export enum FilterKey {
  Treasure = "Treasure",
  Victory = "Victory",
  Action = "Action",
  Curse = "Curse",
}

interface FilterKeys {
  include?: FilterKey[],
  exclude?: FilterKey[],
  maxCost?: number,
  minCost?: number,
}

export class CardFilter {
  static filter(cards: Card[], keys: FilterKeys) : Card[] {
    return cards.filter(card => {
      if (keys.exclude !== void 0 && this.hasCategory(card, keys.exclude)) {
        return false;
      }

      if (keys.include !== void 0 &&!this.hasCategory(card, keys.include)) {
        return false;
      }

      const maxCost = keys.maxCost === undefined ? Infinity : keys.maxCost;
      if (card.cost() > maxCost) {
        return false;
      }

      const minCost = keys.minCost === undefined ? 0 : keys.minCost;
      if (card.cost() < minCost) {
        return false;
      }

      return true;
    })
  }

  private static hasCategory(card: Card, categoryKeys: FilterKey[]) {
    for (const key of categoryKeys) {
      if (card.category() === CardCategory[key as keyof typeof FilterKey]) {
        return true;
      }
    }

    return false;
  }
}
