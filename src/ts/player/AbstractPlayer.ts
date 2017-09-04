import PropertyHandler from "handler/PropertyHandler";
import AvatarFactory from "factory/AvatarFactory";

export default abstract class AbstractPlayer {
  protected propertyHandler: PropertyHandler = new PropertyHandler();
  protected playerIndex: number;
  protected _image = AvatarFactory.build();

  constructor(playerIndex: number) {
    this.playerIndex = playerIndex;
  }

  async initilize() : Promise<void> {
    await this.propertyHandler.initilize();
  }

  getProperty() {
    return this.propertyHandler;
  }

  image() {
    return this._image;
  }
}
