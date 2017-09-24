import CardComponent from "component/CardComponent";

const template = `
<div>
  <div id="action-area-head" class="action-area-column">
  <span id="action-area-description">{{parameters.description}}</span>
  </div>
  <div id="action-area-body" class="action-area-column">
    <div v-for="button in parameters.buttons">
    <button data-button-id="button.id">{{button.text}}</button>
    </div>
  </div>
  <div id="action-area-foot" class="action-area-column">

  </div>
</div>
`;

export default {
  template: template,
  props: ["parameters"],
};
