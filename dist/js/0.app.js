webpackJsonp([0],{

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CardId;
(function (CardId) {
    CardId["Copper"] = "Copper";
    CardId["Silver"] = "Silver";
    CardId["Gold"] = "Gold";
    CardId["Estate"] = "Estate";
    CardId["Duchy"] = "Duchy";
    CardId["Province"] = "Province";
    CardId["Curse"] = "Curse";
    CardId["Celler"] = "Celler";
    CardId["Market"] = "Market";
    CardId["Militia"] = "Militia";
    CardId["Mine"] = "Mine";
    CardId["Moat"] = "Moat";
    CardId["Remodel"] = "Remodel";
    CardId["Smithy"] = "Smithy";
    CardId["Village"] = "Village";
    CardId["Woodcutter"] = "Woodcutter";
    CardId["Workshop"] = "Workshop";
})(CardId || (CardId = {}));
exports.default = CardId;


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UniqueId_1 = __webpack_require__(40);
class AbstractCard {
    constructor() {
        this._itemId = UniqueId_1.default.generate();
    }
    itemId() {
        return this._itemId;
    }
    imagesrc() {
        return `image/card/${this.cardId()}.png`;
    }
}
exports.default = AbstractCard;


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UniqueId {
    static generate() {
        const chars = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".split("");
        for (let i = 0, len = chars.length; i < len; i++) {
            switch (chars[i]) {
                case "x":
                    chars[i] = Math.floor(Math.random() * 16).toString(16);
                    break;
                case "y":
                    chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                    break;
            }
        }
        return chars.join("");
    }
}
exports.default = UniqueId;


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActionCategory;
(function (ActionCategory) {
    ActionCategory["Action"] = "Action";
    ActionCategory["Attack"] = "Attack";
    ActionCategory["Reaction"] = "Reaction";
})(ActionCategory || (ActionCategory = {}));
exports.default = ActionCategory;


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ActionEffectCollection {
    constructor({ action = 0, buy = 0, card = 0, coin = 0 }) {
        this._action = action;
        this._buy = buy;
        this._card = card;
        this._coin = coin;
    }
    action() {
        return this.action;
    }
    buy() {
        return this.buy;
    }
    card() {
        return this.card;
    }
    coin() {
        return this.coin;
    }
}
exports.default = ActionEffectCollection;


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCard_1 = __webpack_require__(39);
const CardId_1 = __webpack_require__(38);
const CardCategory_1 = __webpack_require__(4);
const ActionCategory_1 = __webpack_require__(41);
const ActionEffectCollection_1 = __webpack_require__(42);
class Celler extends AbstractCard_1.default {
    cardId() {
        return CardId_1.default.Celler;
    }
    name() {
        return "地下貯蔵庫";
    }
    category() {
        return CardCategory_1.default.Action;
    }
    cost() {
        return 2;
    }
    description() {
        return "+1 アクション。好きな枚数のカードを捨て札にし、 同じ枚数のカードを引く。";
    }
    actionCategory() {
        return new Set([
            ActionCategory_1.default.Action,
        ]);
    }
    effect() {
        return new ActionEffectCollection_1.default({
            action: 1,
        });
    }
    excute() {
    }
}
exports.default = Celler;


/***/ })

});