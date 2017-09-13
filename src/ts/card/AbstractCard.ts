import CardId from "list/CardId";
import UniqueId from "util/UniqueId";
import ActionEffectCollection from "card/ActionEffectCollection";
import Context from "context/Context";
import DI from "util/DI";

export default abstract class AbstractCard {
  protected _itemId = UniqueId.generate();
  @DI.inject()
  private context: () => Context;

  itemId() {
    return this._itemId;
  }

  imagesrc() {
    return `image/card/${this.cardId()}.png`;
  }

  abstract cardId() : CardId;

  abstract effect() : ActionEffectCollection;

  protected excuteAtionEffect() {
    const actionEffect = this.effect();

    this.context().turn.propertyHandler.draw(actionEffect.card());
    this.context().turn.turnPointHandler.action.increase(actionEffect.action());
    this.context().turn.turnPointHandler.buy.increase(actionEffect.buy());
    this.context().turn.turnPointHandler.effectCoin.increase(actionEffect.coin());
    this.context().turn.turnPointHandler.coin.increase(actionEffect.coin());
  }
}
