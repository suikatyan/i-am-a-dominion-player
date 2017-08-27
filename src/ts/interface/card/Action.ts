import Card from "interface/card/Card";
import ActionCategory from "list/ActionCategory";
import ActionEffectCollection from "card/ActionEffectCollection";

export default interface Action extends Card {
  actionCategory: () => Set<ActionCategory>;
  effect: () => ActionEffectCollection;
  excute: () => void;
}
