webpackJsonp([3],{

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

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_card_AbstractCard__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_list_CardId__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_list_CardCategory__ = __webpack_require__(4);



class Copper extends __WEBPACK_IMPORTED_MODULE_0_card_AbstractCard__["a" /* default */] {
    value() {
        return 1;
    }
    cardId() {
        return __WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Copper;
    }
    name() {
        return "銅貨";
    }
    category() {
        return __WEBPACK_IMPORTED_MODULE_2_list_CardCategory__["a" /* default */].Treasure;
    }
    cost() {
        return 0;
    }
    description() {
        return "";
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Copper;



/***/ })

});