import Card from "interface/card/Card";
import CardId from "list/CardId";

export default class CardFactory {
  static async build(cardId: CardId) : Promise<Card> | never {
    try {
      const targetClass = await import(`card/catalog/${cardId}`);
      return new targetClass.default;
    } catch (e) {
      throw new Error("CardFactory build error: カードの作成に失敗しました。");
    }
  }
}
