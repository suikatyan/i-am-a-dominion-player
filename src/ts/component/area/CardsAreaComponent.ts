import CardComponent from "component/CardComponent";

const template = `
<div>
  <div id="action-area-head" class="action-area-column">
  <span id="action-area-description">{{parameters.description}}</span>
  </div>
  <div id="action-area-body" class="action-area-column">
    <div v-for="card in parameters.cards" v-bind:class="{'action-area-card-selected' : card.category() === 'Treasure'}">
      <card-component :card="card"></card-component>
    </div>
  </div>
  <div id="action-area-foot" class="action-area-column"></div>
</div>
`;

export default {
  template: template,
  props: ["parameters"],
  components: {
    "card-component": CardComponent,
  },
};
