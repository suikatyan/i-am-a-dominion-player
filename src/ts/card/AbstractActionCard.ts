import AbstractCard from 'card/AbstractCard';
import ActionEffectCollection from "card/ActionEffectCollection";
import Context from "context/Context";
import DI from "util/DI";
import NotificationHandler from "handler/NotificationHandler";
import MarketHandler from "handler/MarketHandler";

export default abstract class AbstractActionCard extends AbstractCard {
  @DI.inject()
  protected context: () => Context;
  @DI.inject()
  private notification: () => NotificationHandler;
  @DI.inject()
  protected marketHandler: () => MarketHandler;

  abstract effect() : ActionEffectCollection;

  private excuteActionEffect() {
    const actionEffect = this.effect();
    const turnPointHandler = this.context().turn.turnPointHandler;

    this.context().turn.propertyHandler.draw(actionEffect.card());
    turnPointHandler.action.increase(actionEffect.action());
    turnPointHandler.buy.increase(actionEffect.buy());
    turnPointHandler.effectCoin.increase(actionEffect.coin());
    turnPointHandler.coin.increase(actionEffect.coin());
  }

  async excute() {
    this.notification().say(`${this.name()}をプレイ中です。`);
    this.excuteActionEffect();
    await this.onExcute();
  }

  protected abstract async onExcute() : Promise<void>;
  protected abstract name() : string;
}
