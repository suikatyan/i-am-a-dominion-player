const template = `
<span>
  <img v-bind:src="card.imagesrc()" class="card" v-bind:data-item-id="card.itemId()">
  <span class="market-card-count">10</span>
</span>
`;

export default {
  template: template,
  props: ["card"],
};
