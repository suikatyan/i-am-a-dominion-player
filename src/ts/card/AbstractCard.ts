import CardId from "list/CardId";
import UniqueId from "util/UniqueId";

export default abstract class AbstractCard {
  protected _itemId = UniqueId.generate();

  itemId() {
    return this._itemId;
  }

  imagesrc() {
    return `image/card/${this.cardId()}.png`;
  }

  abstract cardId() : CardId;
}
