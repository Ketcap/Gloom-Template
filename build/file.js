"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _chalk = _interopRequireDefault(require("chalk"));

var inquirer = _interopRequireWildcard(require("inquirer"));

var _fsExtra = require("fs-extra");

var _util = require("./util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var question = function question(variable, fileSpesific) {
  return {
    type: 'input',
    name: variable,
    message: "What's the declaration of ".concat(_chalk["default"].green(variable), " (").concat(!fileSpesific ? 'Global' : 'File', ")")
  };
};

var _callee = function _callee(filePaths, template) {
  var answers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _value, _ret;

  return _regenerator["default"].async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!template.variables || template.variables.length < 1)) {
            _context2.next = 4;
            break;
          }

          (0, _util.infoLog)("There's no global variables", "Skipping...");
          _context2.next = 7;
          break;

        case 4:
          _context2.next = 6;
          return _regenerator["default"].awrap(inquirer.prompt(template.variables.map(function (e) {
            return question(e);
          })));

        case 6:
          answers = _context2.sent;

        case 7:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _context2.prev = 9;

          _loop = function _loop() {
            var path, file, pathReg, varReg, outputRegex, variableRegex, paths, fileName, output, inlineVariable, inlineVariables, deleteRegex, fileExists, answer;
            return _regenerator["default"].async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    path = _value;
                    file = (0, _fsExtra.readFileSync)(path, 'utf8');
                    pathReg = /path:(.*)/;
                    varReg = /variables:(.*)/;
                    outputRegex = new RegExp(pathReg, "gi").exec(file);
                    variableRegex = new RegExp(varReg, "gi").exec(file);
                    paths = path.split('\\');
                    fileName = paths[paths.length - 1];

                    if (outputRegex) {
                      _context.next = 10;
                      break;
                    }

                    throw {
                      error: 'no-path',
                      file: path
                    };

                  case 10:
                    output = outputRegex[1];

                    if (!variableRegex) {
                      _context.next = 18;
                      break;
                    }

                    (0, _util.infoLog)("Local variable found", "Naming variables from ".concat(_chalk["default"].green(fileName)));
                    inlineVariable = variableRegex[1].split(',');
                    _context.next = 16;
                    return _regenerator["default"].awrap(inquirer.prompt(inlineVariable.map(function (e) {
                      return question(e, true);
                    })));

                  case 16:
                    inlineVariables = _context.sent;
                    answers = _objectSpread({}, answers, {
                      inlineVariables: inlineVariables
                    });

                  case 18:
                    Object.keys(answers).map(function (key) {
                      var replaceRegex = new RegExp('{' + key + '}', 'g');
                      file = file.replace(replaceRegex, answers[key]);
                      output = output.replace(replaceRegex, answers[key]);
                    });
                    deleteRegex = new RegExp(/(path:(.*))|(variables:(.*))/gi);
                    file = file.replace(deleteRegex, '').trim();
                    _context.next = 23;
                    return _regenerator["default"].awrap((0, _fsExtra.pathExistsSync)(output));

                  case 23:
                    fileExists = _context.sent;

                    if (!fileExists) {
                      _context.next = 30;
                      break;
                    }

                    _context.next = 27;
                    return _regenerator["default"].awrap(inquirer.prompt([{
                      type: 'confirm',
                      name: 'replace',
                      message: "".concat(_chalk["default"].green(output), " is already created. Do you want to ").concat(_chalk["default"].greenBright('replace'), " it"),
                      "default": true
                    }]));

                  case 27:
                    answer = _context.sent;

                    if (answer.replace) {
                      _context.next = 30;
                      break;
                    }

                    return _context.abrupt("return", {
                      v: void 0
                    });

                  case 30:
                    _context.prev = 30;
                    (0, _fsExtra.ensureFileSync)(output);
                    (0, _fsExtra.writeFileSync)(output, file, {
                      encoding: 'utf8'
                    });
                    _context.next = 39;
                    break;

                  case 35:
                    _context.prev = 35;
                    _context.t0 = _context["catch"](30);
                    console.log(_context.t0);
                    throw {
                      error: 'write-error',
                      e: _context.t0
                    };

                  case 39:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[30, 35]]);
          };

          _iterator = (0, _asyncIterator2["default"])(filePaths);

        case 12:
          _context2.next = 14;
          return _regenerator["default"].awrap(_iterator.next());

        case 14:
          _step = _context2.sent;
          _iteratorNormalCompletion = _step.done;
          _context2.next = 18;
          return _regenerator["default"].awrap(_step.value);

        case 18:
          _value = _context2.sent;

          if (_iteratorNormalCompletion) {
            _context2.next = 28;
            break;
          }

          _context2.next = 22;
          return _regenerator["default"].awrap(_loop());

        case 22:
          _ret = _context2.sent;

          if (!((0, _typeof2["default"])(_ret) === "object")) {
            _context2.next = 25;
            break;
          }

          return _context2.abrupt("return", _ret.v);

        case 25:
          _iteratorNormalCompletion = true;
          _context2.next = 12;
          break;

        case 28:
          _context2.next = 34;
          break;

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 34:
          _context2.prev = 34;
          _context2.prev = 35;

          if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
            _context2.next = 39;
            break;
          }

          _context2.next = 39;
          return _regenerator["default"].awrap(_iterator["return"]());

        case 39:
          _context2.prev = 39;

          if (!_didIteratorError) {
            _context2.next = 42;
            break;
          }

          throw _iteratorError;

        case 42:
          return _context2.finish(39);

        case 43:
          return _context2.finish(34);

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[9, 30, 34, 44], [35,, 39, 43]]);
};

exports["default"] = _callee;