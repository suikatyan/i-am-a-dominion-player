import "config/diConfig";
import Dominion from "application/Dominion";

(async () => {
  const application = new Dominion();
  await application.initialize();
  await application.startSession();
})();
