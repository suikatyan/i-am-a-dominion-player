import "config/diConfig";
import Dominion from "application/Dominion";

(async () => {
  const application = new Dominion();
  await application.initialize();
  await application.startSession();
})();

// import CardFactory from "factory/CardFactory";
// import CardId from "list/CardId";

// (async () => {
//   console.log(await CardFactory.build(CardId.Celler));
// })();
