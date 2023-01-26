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
var IsISO31661Alpha2_exports = {};
__export(IsISO31661Alpha2_exports, {
  IS_ISO31661_ALPHA_2: () => IS_ISO31661_ALPHA_2,
  IsISO31661Alpha2: () => IsISO31661Alpha2,
  isISO31661Alpha2: () => isISO31661Alpha2
});
module.exports = __toCommonJS(IsISO31661Alpha2_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isISO31661Alpha2 = __toESM(require("validator/lib/isISO31661Alpha2"));
const IS_ISO31661_ALPHA_2 = "isISO31661Alpha2";
function isISO31661Alpha2(value) {
  return typeof value === "string" && (0, import_isISO31661Alpha2.default)(value);
}
function IsISO31661Alpha2(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_ISO31661_ALPHA_2,
      validator: {
        validate: (value, args) => isISO31661Alpha2(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid ISO31661 Alpha2 code",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_ISO31661_ALPHA_2,
  IsISO31661Alpha2,
  isISO31661Alpha2
});
//# sourceMappingURL=IsISO31661Alpha2.js.map
