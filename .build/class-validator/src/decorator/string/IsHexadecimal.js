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
var IsHexadecimal_exports = {};
__export(IsHexadecimal_exports, {
  IS_HEXADECIMAL: () => IS_HEXADECIMAL,
  IsHexadecimal: () => IsHexadecimal,
  isHexadecimal: () => isHexadecimal
});
module.exports = __toCommonJS(IsHexadecimal_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isHexadecimal = __toESM(require("validator/lib/isHexadecimal"));
const IS_HEXADECIMAL = "isHexadecimal";
function isHexadecimal(value) {
  return typeof value === "string" && (0, import_isHexadecimal.default)(value);
}
function IsHexadecimal(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_HEXADECIMAL,
      validator: {
        validate: (value, args) => isHexadecimal(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a hexadecimal number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_HEXADECIMAL,
  IsHexadecimal,
  isHexadecimal
});
//# sourceMappingURL=IsHexadecimal.js.map
