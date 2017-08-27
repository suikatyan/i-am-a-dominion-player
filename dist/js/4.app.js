webpackJsonp([4,5],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCardSet_1 = __webpack_require__(5);
const CardId_1 = __webpack_require__(38);
class FirstGame extends AbstractCardSet_1.default {
    startCards() {
        return super.startCards();
    }
    basicSupplyCards(playerCount) {
        return super.basicSupplyCards(playerCount);
    }
    kingdomCards() {
        return new Map([
            [CardId_1.default.Celler, 10],
            [CardId_1.default.Market, 10],
            [CardId_1.default.Woodcutter, 10],
            [CardId_1.default.Militia, 10],
            [CardId_1.default.Mine, 10],
            [CardId_1.default.Moat, 10],
            [CardId_1.default.Remodel, 10],
            [CardId_1.default.Smithy, 10],
            [CardId_1.default.Village, 10],
            [CardId_1.default.Workshop, 10],
        ]);
    }
    allCards() {
        return super.allCards();
    }
}
exports.default = FirstGame;


/***/ }),

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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CardId_1 = __webpack_require__(38);
class AbstractCardSet {
    startCards() {
        return new Map([
            [CardId_1.default.Copper, 7],
            [CardId_1.default.Estate, 3],
        ]);
    }
    basicSupplyCards(playerCount) {
        const victoryCount = playerCount === 2 ? 8 : 12;
        const curseCount = playerCount * 2 - 10;
        return new Map([
            [CardId_1.default.Copper, 60],
            [CardId_1.default.Silver, 40],
            [CardId_1.default.Gold, 30],
            [CardId_1.default.Estate, victoryCount],
            [CardId_1.default.Duchy, victoryCount],
            [CardId_1.default.Province, victoryCount],
            [CardId_1.default.Curse, curseCount],
        ]);
    }
    allCards() {
        const a = Array.from(this.basicSupplyCards(2).keys());
        const b = Array.from(this.kingdomCards().keys());
        return new Set(a.concat(b));
    }
}
exports.default = AbstractCardSet;


/***/ })

});