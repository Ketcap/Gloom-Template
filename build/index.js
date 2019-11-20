#!/usr/bin/env node
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("@babel/polyfill");

var _fsExtra = require("fs-extra");

var path = _interopRequireWildcard(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _util = require("./util");

var _template = _interopRequireDefault(require("./template"));

var _file = _interopRequireDefault(require("./file"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var init = function init() {
  var generator, filePath, template, selectedTemplate, files, dir, readDirExists;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _util.generalLog)('Welcome to the Gloom');
          generator = {};
          _context.prev = 2;
          filePath = "".concat(process.cwd(), "/generator.json");
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _fsExtra.readJsonSync)(filePath));

        case 6:
          generator = _context.sent;

          if (!(Object.keys(generator).length < 1)) {
            _context.next = 9;
            break;
          }

          throw {
            syscall: 'no-key'
          };

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);

          if (_context.t0.syscall === 'open') {
            (0, _util.errorLog)("Uppps i've got an error !", "It looks like you dont have a ".concat(_chalk["default"].green('generator.json'), " in your main directory"));
          } else if (_context.t0.syscall === 'no-key') {
            (0, _util.errorLog)("Uppps i've got an file error !", "There's nothing in your ".concat(_chalk["default"].green('generator.json'), "."));
          } else {
            (0, _util.errorLog)("Uppps i've got an reading error !", _context.t0);
          }

          return _context.abrupt("return");

        case 15:
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap((0, _template["default"])(generator));

        case 18:
          selectedTemplate = _context.sent;
          template = generator[selectedTemplate];

          if (template.path) {
            _context.next = 22;
            break;
          }

          throw {
            error: 'no-path',
            selectedTemplate: selectedTemplate
          };

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t1 = _context["catch"](15);

          if (_context.t1.error === 'no-path') {
            (0, _util.errorLog)("Uppps i've got an path error !", "There's no path in your ".concat(_chalk["default"].green(_context.t1.selectedTemplate), " template"));
          } else {
            (0, _util.errorLog)("Uppps i've got some error !", _context.t1);
          }

          return _context.abrupt("return");

        case 28:
          files = [];
          _context.prev = 29;
          dir = path.join(process.cwd(), template.path);
          readDirExists = (0, _fsExtra.pathExistsSync)(dir);

          if (readDirExists) {
            _context.next = 34;
            break;
          }

          throw {
            error: 'no-dir'
          };

        case 34:
          files = (0, _fsExtra.readdirSync)(dir);

          if (!(files.length < 1)) {
            _context.next = 37;
            break;
          }

          throw {
            error: 'no-file'
          };

        case 37:
          files = files.map(function (file) {
            return path.join(dir, file);
          });
          _context.next = 46;
          break;

        case 40:
          _context.prev = 40;
          _context.t2 = _context["catch"](29);

          if (_context.t2.error === 'no-dir') {
            (0, _util.errorLog)("Uppps i've got an error !", "It seems there's no ".concat(_chalk["default"].green(template.path), " directory"));
          }

          if (!(_context.t2.error === 'no-file')) {
            _context.next = 46;
            break;
          }

          (0, _util.errorLog)("Uppps i've got an error !", "It seems there's no files under ".concat(_chalk["default"].green(template.path)));
          return _context.abrupt("return");

        case 46:
          _context.prev = 46;
          _context.next = 49;
          return regeneratorRuntime.awrap((0, _file["default"])(files, template));

        case 49:
          _context.next = 57;
          break;

        case 51:
          _context.prev = 51;
          _context.t3 = _context["catch"](46);

          if (_context.t3.error === 'empty') {
            (0, _util.errorLog)("Uppps i've got an error !", "It seems your ".concat(_chalk["default"].green(_context.t3.file), " is empty"));
          }

          if (_context.t3.error === 'no-path') {
            (0, _util.errorLog)("Uppps i've got an error !", "It seems your ".concat(_chalk["default"].green(_context.t3.file), " has no output path.Please add ").concat(_chalk["default"].green('path:your-dir'), " in first line"));
          }

          if (_context.t3.error === 'write-error') {
            (0, _util.errorLog)("Uppps i've got an error !", "It seems there's file writing error ");
          }

          return _context.abrupt("return");

        case 57:
          (0, _util.infoLog)("Templates are created as you wish", "");

        case 58:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11], [15, 24], [29, 40], [46, 51]]);
};

init();