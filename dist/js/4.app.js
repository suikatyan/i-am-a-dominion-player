webpackJsonp([4,5],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cardSet_AbstractCardSet__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_list_CardId__ = __webpack_require__(38);


class FirstGame extends __WEBPACK_IMPORTED_MODULE_0_cardSet_AbstractCardSet__["default"] {
    startCards() {
        return super.startCards();
    }
    basicSupplyCards(playerCount) {
        return super.basicSupplyCards(playerCount);
    }
    kingdomCards() {
        return new Map([
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Celler, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Market, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Woodcutter, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Militia, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Mine, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Moat, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Remodel, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Smithy, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Village, 10],
            [__WEBPACK_IMPORTED_MODULE_1_list_CardId__["a" /* default */].Workshop, 10],
        ]);
    }
    allCards() {
        return super.allCards();
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = FirstGame;



/***/ }),

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

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_list_CardId__ = __webpack_require__(38);

class AbstractCardSet {
    startCards() {
        return new Map([
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Copper, 7],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Estate, 3],
        ]);
    }
    basicSupplyCards(playerCount) {
        const victoryCount = playerCount === 2 ? 8 : 12;
        const curseCount = playerCount * 2 - 10;
        return new Map([
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Copper, 60],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Silver, 40],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Gold, 30],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Estate, victoryCount],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Duchy, victoryCount],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Province, victoryCount],
            [__WEBPACK_IMPORTED_MODULE_0_list_CardId__["a" /* default */].Curse, curseCount],
        ]);
    }
    allCards() {
        const a = Array.from(this.basicSupplyCards(2).keys());
        const b = Array.from(this.kingdomCards().keys());
        return new Set(a.concat(b));
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = AbstractCardSet;



/***/ })

});