import PropertyHandler from "handler/PropertyHandler";

export default interface Player {
  isRobot: () => boolean;
  getProperty: () => PropertyHandler;
  name: () => string;
}
