"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var inquirer = _interopRequireWildcard(require("inquirer"));

var _callee = function _callee(generator) {
  var question, answer;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          question = {
            type: "list",
            name: 'template',
            message: "Which template you wanna use ?",
            choices: Object.keys(generator)
          };
          _context.next = 3;
          return _regenerator["default"].awrap(inquirer.prompt([question]));

        case 3:
          answer = _context.sent;
          return _context.abrupt("return", answer.template);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports["default"] = _callee;