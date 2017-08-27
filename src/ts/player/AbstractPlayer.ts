import PropertyHandler from "handler/PropertyHandler";

export default abstract class AbstractPlayer {
  protected propertyHandler: PropertyHandler = new PropertyHandler();
  protected playerIndex: number;

  constructor(playerIndex: number) {
    this.playerIndex = playerIndex;
  }

  async initilize() : Promise<void> {
    await this.propertyHandler.initilize();
  }

  getProperty() {
    return this.propertyHandler;
  }
}
