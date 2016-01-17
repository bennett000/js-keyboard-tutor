webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var browser_1 = __webpack_require__(25);
	var app_1 = __webpack_require__(242);
	var configure_store_1 = __webpack_require__(245);
	var pc_keyboard_controller_1 = __webpack_require__(243);
	var provider = __webpack_require__(259).provider;
	var store = configure_store_1.default();
	browser_1.bootstrap(app_1.App, [
	    provider(store),
	    pc_keyboard_controller_1.PcKeyboardController
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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(46);
	var pc_keyboard_controller_1 = __webpack_require__(243);
	var App = (function () {
	    function App(ngRedux, pcKeyboardController) {
	        this.pcKeyboardController = pcKeyboardController;
	        this.store = ngRedux;
	    }
	    App.prototype.ngOnInit = function () {
	        var _this = this;
	        this.pcKeyboardController.attach();
	        this.unsubscribe = this.store.subscribe(function () {
	            console.log(_this.store.getState());
	        });
	    };
	    App.prototype.ngOnDestroy = function () {
	        this.pcKeyboardController.remove();
	        if (this.unsubscribe) {
	            this.unsubscribe();
	        }
	    };
	    App = __decorate([
	        core_1.Component({
	            selector: 'keyboard-tutor',
	            template: "<h1 (keypress)=\"onKeyPress($event)\">Keyboard Tutor</h1>"
	        }),
	        __param(0, core_1.Inject('ngRedux')), 
	        __metadata('design:paramtypes', [Object, pc_keyboard_controller_1.PcKeyboardController])
	    ], App);
	    return App;
	})();
	exports.App = App;


/***/ },

/***/ 243:
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
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(46);
	var pc_keypress_1 = __webpack_require__(244);
	/*global window */
	var PcKeyboardController = (function () {
	    function PcKeyboardController(ngRedux) {
	        this.store = ngRedux;
	        this.attach();
	    }
	    PcKeyboardController.prototype.attach = function () {
	        window.addEventListener('keypress', this.listener.bind(this));
	    };
	    PcKeyboardController.prototype.remove = function () {
	        window.removeEventListener('keypress', this.listener.bind(this));
	    };
	    PcKeyboardController.prototype.listener = function (e) {
	        this.store.dispatch(pc_keypress_1.pcKeypress(e.charCode, +Date.now()));
	    };
	    PcKeyboardController = __decorate([
	        core_1.Injectable(),
	        __param(0, core_1.Inject('ngRedux')), 
	        __metadata('design:paramtypes', [Object])
	    ], PcKeyboardController);
	    return PcKeyboardController;
	})();
	exports.PcKeyboardController = PcKeyboardController;


/***/ },

/***/ 244:
/***/ function(module, exports) {

	exports.PC_KEYPRESS = 'PC_KEYPRESS';
	function pcKeypress(charCode, timestamp) {
	    return {
	        payload: {
	            charCode: charCode,
	            timestamp: timestamp
	        },
	        type: exports.PC_KEYPRESS
	    };
	}
	exports.pcKeypress = pcKeypress;


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	var redux_1 = __webpack_require__(246);
	var thunk = __webpack_require__(255);
	var index_1 = __webpack_require__(256);
	var finalCreateStore = redux_1.compose(redux_1.applyMiddleware(thunk))(redux_1.createStore);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function () {
	    return finalCreateStore(index_1.default);
	};


/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	var redux_1 = __webpack_require__(246);
	var pc_keyboard_1 = __webpack_require__(257);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = redux_1.combineReducers({
	    pcKeyboard: pc_keyboard_1.pcKeyboard
	});


/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	var pc_keypress_1 = __webpack_require__(244);
	var immutable = __webpack_require__(258);
	var List = immutable.List;
	function pcKeyboard(state, action) {
	    if (state === void 0) { state = List(); }
	    switch (action.type) {
	        case pc_keypress_1.PC_KEYPRESS:
	            return state.push(action.payload.charCode);
	        default:
	            return state;
	    }
	}
	exports.pcKeyboard = pcKeyboard;


/***/ }

});
//# sourceMappingURL=bundle.js.map