import DI from "util/DI";
import Context from "context/Context";
import PlayerHandler from "handler/PlayerHandler";
import NotificationHandler from "handler/NotificationHandler";

DI.subscribe("playerHandler", new PlayerHandler());
DI.subscribe("context", new Context());
DI.subscribe("notification", new NotificationHandler());
