import CardComponent from "component/CardComponent";

const template = `
<div>
  <div v-for="card in cards">
    <card-component :card="card"></card-component>
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
