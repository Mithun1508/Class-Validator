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
var IsISRC_exports = {};
__export(IsISRC_exports, {
  IS_ISRC: () => IS_ISRC,
  IsISRC: () => IsISRC,
  isISRC: () => isISRC
});
module.exports = __toCommonJS(IsISRC_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isISRC = __toESM(require("validator/lib/isISRC"));
const IS_ISRC = "isISRC";
function isISRC(value) {
  return typeof value === "string" && (0, import_isISRC.default)(value);
}
function IsISRC(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_ISRC,
      validator: {
        validate: (value, args) => isISRC(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be an ISRC", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_ISRC,
  IsISRC,
  isISRC
});
//# sourceMappingURL=IsISRC.js.map
