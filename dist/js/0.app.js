webpackJsonp([0],{

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (CardId);


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util_UniqueId__ = __webpack_require__(40);

class AbstractCard {
    constructor() {
        this._itemId = __WEBPACK_IMPORTED_MODULE_0_util_UniqueId__["a" /* default */].generate();
    }
    itemId() {
        return this._itemId;
    }
    imagesrc() {
        return `image/card/${this.cardId()}.png`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractCard;



/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = UniqueId;



/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ActionCategory;
(function (ActionCategory) {
    ActionCategory["Action"] = "Action";
    ActionCategory["Attack"] = "Attack";
    ActionCategory["Reaction"] = "Reaction";
})(ActionCategory || (ActionCategory = {}));
/* harmony default export */ __webpack_exports__["a"] = (ActionCategory);


/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ActionEffectCollection;



/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_card_AbstractCard__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_list_CardId__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_list_CardCategory__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_list_ActionCategory__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_card_ActionEffectCollection__ = __webpack_require__(42);





class Celler extends __WEBPACK_IMPORTED_MODULE_0_card_AbstractCard__["a" /* default */] {
    cardId() {
        return __WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Celler;
    }
    name() {
        return "地下貯蔵庫";
    }
    category() {
        return __WEBPACK_IMPORTED_MODULE_2_list_CardCategory__["a" /* default */].Action;
    }
    cost() {
        return 2;
    }
    description() {
        return "+1 アクション。好きな枚数のカードを捨て札にし、 同じ枚数のカードを引く。";
    }
    actionCategory() {
        return new Set([
            __WEBPACK_IMPORTED_MODULE_3_list_ActionCategory__["a" /* default */].Action,
        ]);
    }
    effect() {
        return new __WEBPACK_IMPORTED_MODULE_4_card_ActionEffectCollection__["a" /* default */]({
            action: 1,
        });
    }
    excute() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Celler;



/***/ })

});