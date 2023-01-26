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
var IsMobilePhone_exports = {};
__export(IsMobilePhone_exports, {
  IS_MOBILE_PHONE: () => IS_MOBILE_PHONE,
  IsMobilePhone: () => IsMobilePhone,
  isMobilePhone: () => isMobilePhone
});
module.exports = __toCommonJS(IsMobilePhone_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isMobilePhone = __toESM(require("validator/lib/isMobilePhone"));
const IS_MOBILE_PHONE = "isMobilePhone";
function isMobilePhone(value, locale, options) {
  return typeof value === "string" && (0, import_isMobilePhone.default)(value, locale, options);
}
function IsMobilePhone(locale, options, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_MOBILE_PHONE,
      constraints: [locale, options],
      validator: {
        validate: (value, args) => isMobilePhone(value, args.constraints[0], args.constraints[1]),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be a phone number", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_MOBILE_PHONE,
  IsMobilePhone,
  isMobilePhone
});
//# sourceMappingURL=IsMobilePhone.js.map
