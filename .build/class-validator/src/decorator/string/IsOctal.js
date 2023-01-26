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
var IsOctal_exports = {};
__export(IsOctal_exports, {
  IS_OCTAL: () => IS_OCTAL,
  IsOctal: () => IsOctal,
  isOctal: () => isOctal
});
module.exports = __toCommonJS(IsOctal_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isOctal = __toESM(require("validator/lib/isOctal"));
const IS_OCTAL = "isOctal";
function isOctal(value) {
  return typeof value === "string" && (0, import_isOctal.default)(value);
}
function IsOctal(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_OCTAL,
      validator: {
        validate: (value, args) => isOctal(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be valid octal number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_OCTAL,
  IsOctal,
  isOctal
});
//# sourceMappingURL=IsOctal.js.map
