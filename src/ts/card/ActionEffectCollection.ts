interface ActionEffectParamaeters {
  action?: number;
  buy?: number;
  card?: number
  coin?: number;
}


export default class ActionEffectCollection {
  private _action: number;
  private _buy: number;
  private _card: number;
  private _coin: number;

  constructor({action = 0, buy = 0, card = 0, coin = 0}: ActionEffectParamaeters) {
    this._action = action;
    this._buy = buy;
    this._card = card;
    this._coin = coin;
  }

  action() : number {
    return this._action;
  }

  buy() : number {
    return this._buy;
  }

  card() : number {
    return this._card;
  }

  coin() : number {
    return this._coin;
  }
}
