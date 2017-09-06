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
}

export class CardFilter {
  static filter(cards: Card[], keys: FilterKeys) {
    return cards.filter(card => {
      const exclude = keys.exclude === undefined ? [] : keys.exclude;
      for (const excludeKey of exclude) {
        if (card.category() === CardCategory[excludeKey as keyof typeof FilterKey]) {
          return false;
        }
      }
      const include = keys.include === undefined ? [] : keys.include;
      for (const includeKey of include) {
        if (card.category() === CardCategory[includeKey as keyof typeof FilterKey]) {
          return true;
        }
      }

      return false;
    })
  }
}
