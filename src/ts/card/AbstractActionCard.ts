import AbstractCard from 'card/AbstractCard';
import ActionEffectCollection from "card/ActionEffectCollection";
import Context from "context/Context";
import DI from "util/DI";

export default abstract class AbstractActionCard extends AbstractCard {
  @DI.inject()
  protected context: () => Context;

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
    this.excuteActionEffect();
    await this.onExcute();
  }

  protected abstract async onExcute() : Promise<void>;
}
