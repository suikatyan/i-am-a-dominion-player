import Card from "interface/card/Card";
import Treasure from "interface/card/Treasure";
import Victory from "interface/card/Victory";

interface WayOfSort {
  isAscending: boolean;
  keys: ("cost" | "value" | "victoryPoint")[];
}

export default class CardSorter {
  static sort(cards: Card[], way: WayOfSort) {
    return cards.sort((cardA, cardB) => {
      return this.prepare(cardA, cardB, way);
    });
  }

  private static prepare(cardA: Card, cardB: Card, {isAscending, keys}: WayOfSort) {
    let result = 0;
    for (const key of keys) {
      switch (key) {
        case "cost":
          result = this.compare(cardA.cost(), cardB.cost(), isAscending);
          break;
        case "value":
          const treasureCardA = cardA as Treasure;
          const treasureCardB = cardA as Treasure;
          result = this.compare(treasureCardA.value(), treasureCardB.value(), isAscending);
          break;
        case "victoryPoint":
          const victoryCardA = cardA as Victory;
          const victoryCardB = cardA as Victory;
          result = this.compare(victoryCardA.victoryPoint(), victoryCardB.victoryPoint(), isAscending);
          break;
      }

      if (result === 0) {
        continue;
      }

      return result;
    }

    return 0;
  }

  private static compare(valueA: number, valueB: number, isAscending: boolean) {
    if (valueA === valueB) {
      return 0;
    }
    if (valueA > valueB) {
      return isAscending ? 1 : -1;
    } else {
      return isAscending ? -1 : 1;
    }
  }
}
