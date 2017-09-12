import EventAwaiter from "util/EventAwaiter";
import Card from "interface/card/Card";

export default class CardPicker {
  static async itemId(targets: any) : Promise<string> {
    const element = await EventAwaiter.awaiter({
      type: "click",
      targets,
    });

    return element.dataset.itemId;
  }

  static async card(cards: Card[], targets: any) : Promise<{index: number, card: Card} | null> {
    const itemId =  await this.itemId(targets);
    for (const [index, card] of cards.entries()) {
      if (itemId === card.itemId()) {
        return {index, card};
      }
    }

    return null;
  }

  static async cardAndButton(cards: Card[], targets: any) : Promise<{index: number, card: Card} | null | false> {
    targets = Array.from(targets);
    targets.push(document.querySelector("#end-button"));
    const itemId =  await this.itemId(targets);
    
    if (itemId === "end-button") {
      return false;
    }

    for (const [index, card] of cards.entries()) {
      if (itemId === card.itemId()) {
        return {index, card};
      }
    }

    return null;
  }
}
