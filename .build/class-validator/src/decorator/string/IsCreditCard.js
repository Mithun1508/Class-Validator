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
var IsCreditCard_exports = {};
__export(IsCreditCard_exports, {
  IS_CREDIT_CARD: () => IS_CREDIT_CARD,
  IsCreditCard: () => IsCreditCard,
  isCreditCard: () => isCreditCard
});
module.exports = __toCommonJS(IsCreditCard_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isCreditCard = __toESM(require("validator/lib/isCreditCard"));
const IS_CREDIT_CARD = "isCreditCard";
function isCreditCard(value) {
  return typeof value === "string" && (0, import_isCreditCard.default)(value);
}
function IsCreditCard(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_CREDIT_CARD,
      validator: {
        validate: (value, args) => isCreditCard(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be a credit card", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_CREDIT_CARD,
  IsCreditCard,
  isCreditCard
});
//# sourceMappingURL=IsCreditCard.js.map
