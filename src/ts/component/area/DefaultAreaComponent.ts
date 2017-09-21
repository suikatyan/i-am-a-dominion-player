import CardComponent from "component/CardComponent";

const template = `
<div>
  <div id="action-area-head" class="action-area-column">
  </div>
  <div id="action-area-body" class="action-area-column">
    <div v-for="card in cards">
      <card-component :card="card"></card-component>
    </div>
  </div>
  <div id="action-area-foot" class="action-area-column">
  </div>
</div>
`;

export default {
  template: template,
  props: ["cards"],
  components: {
    "card-component": CardComponent,
  },
};
