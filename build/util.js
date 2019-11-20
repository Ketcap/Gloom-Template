"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generalLog = exports.infoLog = exports.errorLog = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var log = console.log;

var errorLog = function errorLog(title, desc) {
  log("\n    ".concat(_chalk["default"].red(title), "\n    ").concat(_chalk["default"].redBright(desc), "  \n  "));
};

exports.errorLog = errorLog;

var infoLog = function infoLog(title, desc) {
  log("\n    ".concat(_chalk["default"].blue(title), "\n    ").concat(_chalk["default"].blueBright(desc), "  \n  "));
};

exports.infoLog = infoLog;

var generalLog = function generalLog(title) {
  log("\n    ".concat(_chalk["default"].magentaBright(title), "\n  "));
};

exports.generalLog = generalLog;