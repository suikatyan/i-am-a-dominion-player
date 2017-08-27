import Card from "interface/card/Card";

export default interface Treasure extends Card {
  value: () => number;
}
