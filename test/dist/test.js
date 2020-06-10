/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Controller.js":
/*!***********************!*\
  !*** ./Controller.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controller; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar raf = window.requestAnimationFrame;\nvar caf = window.cancelAnimationFrame;\n\nvar Controller = /*#__PURE__*/function () {\n  function Controller() {\n    _classCallCheck(this, Controller);\n\n    // Unique event IDs\n    this._uid = 0;\n    this._uprop = \"properjsUID\"; // Store for event handlers\n\n    this._handlers = {}; // RAF manager props\n\n    this._started = false;\n    this._paused = false;\n    this._cycle = null;\n  }\n\n  _createClass(Controller, [{\n    key: \"uid\",\n    value: function uid() {\n      this._uid = this._uid + 1;\n      return this._uid;\n    }\n  }, {\n    key: \"go\",\n    value: function go(callback) {\n      var _this = this;\n\n      if (this._started) {\n        return this;\n      }\n\n      this._started = true;\n\n      this._anim = function (elapsed) {\n        _this._cycle = raf(_this._anim);\n\n        if (typeof callback === \"function\") {\n          callback(elapsed);\n        }\n      };\n\n      this._cycle = raf(this._anim);\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this._paused = true;\n      return this;\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this._paused = false;\n      return this;\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      caf(this._cycle);\n      this._paused = false;\n      this._started = false;\n      this._cycle = null;\n      return this;\n    }\n  }, {\n    key: \"on\",\n    value: function on(event, handler) {\n      var events = event.split(\" \");\n      handler[this._uprop] = this.uid();\n\n      for (var i = events.length; i--;) {\n        if (typeof handler === \"function\") {\n          if (!this._handlers[events[i]]) {\n            this._handlers[events[i]] = [];\n          }\n\n          this._handlers[events[i]].push(handler);\n        }\n      }\n\n      return this;\n    }\n  }, {\n    key: \"off\",\n    value: function off(event, handler) {\n      if (!this._handlers[event]) {\n        return this;\n      }\n\n      if (handler) {\n        this._offOne(event, handler);\n      } else {\n        this._offAll(event);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"fire\",\n    value: function fire(event) {\n      if (!this._handlers[event]) {\n        return this;\n      }\n\n      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      for (var i = this._handlers[event].length; i--;) {\n        this._handlers[event][i].apply(this, args);\n      }\n\n      return this;\n    }\n  }, {\n    key: \"_offOne\",\n    value: function _offOne(event, handler) {\n      for (var i = 0, len = this._handlers[event].length; i < len; i++) {\n        if (handler[this._uprop] === this._handlers[event][i][this._uprop]) {\n          this._handlers[event].splice(i, 1);\n\n          break;\n        }\n      }\n    }\n  }, {\n    key: \"_offAll\",\n    value: function _offAll(event) {\n      for (var i = this._handlers[event].length; i--;) {\n        this._handlers[event][i] = null;\n      }\n\n      delete this._handlers[event];\n    }\n  }]);\n\n  return Controller;\n}();\n\n\n\n//# sourceURL=webpack:///./Controller.js?");

/***/ }),

/***/ "./test/test.js":
/*!**********************!*\
  !*** ./test/test.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controller */ \"./Controller.js\");\n\nvar controller = new _Controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ncontroller.on(\"foo\", function (data) {\n  console.log(\"foo fired\", data);\n});\ncontroller.fire(\"foo\", {\n  data: \"stuff\"\n});\ncontroller.go(function (elapsed) {\n  console.log(elapsed);\n});\nsetTimeout(function () {\n  console.log(\"stopping raf\");\n  controller.stop();\n}, 5000);\n\n//# sourceURL=webpack:///./test/test.js?");

/***/ })

/******/ });