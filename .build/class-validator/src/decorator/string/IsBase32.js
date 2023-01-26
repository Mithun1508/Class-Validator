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
var IsBase32_exports = {};
__export(IsBase32_exports, {
  IS_BASE32: () => IS_BASE32,
  IsBase32: () => IsBase32,
  isBase32: () => isBase32
});
module.exports = __toCommonJS(IsBase32_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isBase32 = __toESM(require("validator/lib/isBase32"));
const IS_BASE32 = "isBase32";
function isBase32(value) {
  return typeof value === "string" && (0, import_isBase32.default)(value);
}
function IsBase32(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_BASE32,
      validator: {
        validate: (value, args) => isBase32(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be base32 encoded", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_BASE32,
  IsBase32,
  isBase32
});
//# sourceMappingURL=IsBase32.js.map
