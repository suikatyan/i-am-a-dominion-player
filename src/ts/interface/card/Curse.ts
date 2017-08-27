import Card from "interface/card/Card";

export default interface Curse extends Card {
  victoryPoint: () => number;
}
