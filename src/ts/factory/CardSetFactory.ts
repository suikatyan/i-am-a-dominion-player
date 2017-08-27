import CardSet from "interface/cardSet/CardSet";
import Util from "util/Util";

export default class CardSetFactory {
  static async build(cardSetName: string) : Promise<CardSet> | never {
    try {
      const targetClass = await import(`cardSet/${CardSetFactory.getCardSetName(cardSetName)}`);
      return new targetClass.default;
    } catch (e) {
      throw new Error("CardSetFactory build error: カードセットの作成に失敗しました。");
    }
  }

  private static getCardSetName(cardSetName: string) : string | never {
    if (cardSetName.match(/^[a-z]+(?:-[a-z]+)*$/) === null) {
      throw new Error("CardSetFactory build error: カードセットの名前が不正です。");
    }

    return Util.convertToUpperCamel(cardSetName);
  }
}
