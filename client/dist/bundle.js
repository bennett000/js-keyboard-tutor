webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var browser_1 = __webpack_require__(25);
	var app_1 = __webpack_require__(242);
	var configure_store_1 = __webpack_require__(244);
	var provider = __webpack_require__(259).provider;
	var store = configure_store_1.default();
	browser_1.bootstrap(app_1.App, [
	    provider(store)
	]);


/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(46);
	var pc_keyboard_controller_1 = __webpack_require__(243);
	var App = (function () {
	    function App() {
	        console.log('helloy');
	    }
	    App.prototype.ngOnInit = function () {
	        if (this.pcKeyboardController) {
	            this.pcKeyboardController.remove();
	        }
	        this.pcKeyboardController = pc_keyboard_controller_1.PcKeyboardController.create();
	    };
	    App.prototype.ngOnDestroy = function () {
	        this.pcKeyboardController.remove();
	        this.pcKeyboardController = null;
	    };
	    App = __decorate([
	        core_1.Component({
	            selector: 'keyboard-tutor',
	            template: "<h1 (keypress)=\"onKeyPress($event)\">Keyboard Tutor</h1>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	})();
	exports.App = App;


/***/ },

/***/ 243:
/***/ function(module, exports) {

	/*global window */
	var PcKeyboardController = (function () {
	    function PcKeyboardController() {
	        this.attach();
	    }
	    PcKeyboardController.prototype.attach = function () {
	        window.addEventListener('keypress', this.listener.bind(this));
	    };
	    PcKeyboardController.prototype.remove = function () {
	        window.removeEventListener('keypress', this.listener.bind(this));
	    };
	    PcKeyboardController.prototype.listener = function (e) {
	        console.log('ahhh', e);
	        this.pcKeyboard();
	    };
	    PcKeyboardController.create = function () {
	        return new PcKeyboardController();
	    };
	    return PcKeyboardController;
	})();
	exports.PcKeyboardController = PcKeyboardController;


/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	var redux_1 = __webpack_require__(245);
	var thunk = __webpack_require__(254);
	var index_1 = __webpack_require__(255);
	var finalCreateStore = redux_1.compose(redux_1.applyMiddleware(thunk))(redux_1.createStore);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function () {
	    return finalCreateStore(index_1.default);
	};


/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	var redux_1 = __webpack_require__(245);
	var pc_keyboard_1 = __webpack_require__(256);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = redux_1.combineReducers({
	    pcKeyboard: pc_keyboard_1.pcKeyboard
	});


/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	var pc_keypress_1 = __webpack_require__(257);
	var immutable = __webpack_require__(258);
	var List = immutable.List;
	function pcKeyboard(state, action) {
	    if (state === void 0) { state = List(); }
	    switch (action.type) {
	        case pc_keypress_1.PC_KEYPRESS:
	            return state.push(action.keypress);
	        default:
	            return state;
	    }
	}
	exports.pcKeyboard = pcKeyboard;


/***/ },

/***/ 257:
/***/ function(module, exports) {

	exports.PC_KEYPRESS = 'PC_KEYPRESS';
	function pcKeypress() {
	    return {
	        type: exports.PC_KEYPRESS
	    };
	}
	exports.pcKeypress = pcKeypress;


/***/ }

});
//# sourceMappingURL=bundle.js.map