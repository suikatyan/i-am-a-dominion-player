import CardComponent from "component/CardComponent";
import Card from "interface/card/Card";

const template = `
<div>
  <div id="action-area-head" class="action-area-column">
  <span id="action-area-description">{{parameters.description}}</span>
  </div>
  <div id="action-area-body" class="action-area-column">
    <div v-for="card in parameters.cards" @click="toggleSelect" v-bind:class="{'action-area-card-selected' : isSelected(card)}">
      <card-component :card="card"></card-component>
    </div>
  </div>
  <div id="action-area-foot" class="action-area-column">
    <button id="action-area-done-button" :disabled="isDisabled">完了</button>
  </div>
</div>
`;

export default {
  template: template,
  props: ["parameters"],
  components: {
    "card-component": CardComponent,
  },
  methods: {
    toggleSelect: function(event: Event) {
      const itemId: string = event.target.dataset.itemId;
      const cards: Card[] = this.parameters.cards;
      const selectedCards: Card[] = this.parameters.selectedCards;
      const {max} = this.parameters.count as {max: number};
      const index = selectedCards.findIndex(card => itemId === card.itemId());

      if (index === -1) {
        if (selectedCards.length >= max) {
          return;
        }
        selectedCards.push(cards.find(card => itemId === card.itemId()) as Card);
      } else {
        selectedCards.splice(index, 1);
      }
    },
    isSelected: function(targetCard: Card) {
      const selectedCards: Card[] = this.parameters.selectedCards;
      return selectedCards.findIndex(card => targetCard.itemId() === card.itemId()) !== -1;
    },
  },
  computed: {
    isDisabled: function() : boolean {
      const selectedCards: Card[] = this.parameters.selectedCards;
      const {min} = this.parameters.count as {min: number};
      return selectedCards.length < min;
    },
  },
};
