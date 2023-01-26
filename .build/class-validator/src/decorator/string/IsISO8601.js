"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var IsISO8601_exports = {};
__export(IsISO8601_exports, {
  IS_ISO8601: () => IS_ISO8601,
  IsISO8601: () => IsISO8601,
  isISO8601: () => isISO8601
});
module.exports = __toCommonJS(IsISO8601_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isISO8601 = __toESM(require("validator/lib/isISO8601"));
const IS_ISO8601 = "isIso8601";
function isISO8601(value, options) {
  return typeof value === "string" && (0, import_isISO8601.default)(value, options);
}
function IsISO8601(options, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_ISO8601,
      constraints: [options],
      validator: {
        validate: (value, args) => isISO8601(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid ISO 8601 date string",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_ISO8601,
  IsISO8601,
  isISO8601
});
//# sourceMappingURL=IsISO8601.js.map
