webpackJsonp([2],{

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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCard_1 = __webpack_require__(39);
const CardId_1 = __webpack_require__(38);
const CardCategory_1 = __webpack_require__(4);
class Curse extends AbstractCard_1.default {
    value() {
        return 1;
    }
    cardId() {
        return CardId_1.default.Curse;
    }
    name() {
        return "呪い";
    }
    category() {
        return CardCategory_1.default.Curse;
    }
    cost() {
        return 0;
    }
    description() {
        return "";
    }
    victoryPoint() {
        return -1;
    }
}
exports.default = Curse;


/***/ })

});