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
var IsBase64_exports = {};
__export(IsBase64_exports, {
  IS_BASE64: () => IS_BASE64,
  IsBase64: () => IsBase64,
  isBase64: () => isBase64
});
module.exports = __toCommonJS(IsBase64_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isBase64 = __toESM(require("validator/lib/isBase64"));
const IS_BASE64 = "isBase64";
function isBase64(value) {
  return typeof value === "string" && (0, import_isBase64.default)(value);
}
function IsBase64(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_BASE64,
      validator: {
        validate: (value, args) => isBase64(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be base64 encoded", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_BASE64,
  IsBase64,
  isBase64
});
//# sourceMappingURL=IsBase64.js.map
