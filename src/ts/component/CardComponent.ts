const template = `
<img v-bind:src="card.imagesrc()" class="card" v-bind:data-item-id="card.itemId()">
`;

export default {
  template: template,
  props: ["card"],
};
