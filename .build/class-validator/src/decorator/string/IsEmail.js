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
var IsEmail_exports = {};
__export(IsEmail_exports, {
  IS_EMAIL: () => IS_EMAIL,
  IsEmail: () => IsEmail,
  isEmail: () => isEmail
});
module.exports = __toCommonJS(IsEmail_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isEmail = __toESM(require("validator/lib/isEmail"));
const IS_EMAIL = "isEmail";
function isEmail(value, options) {
  return typeof value === "string" && (0, import_isEmail.default)(value, options);
}
function IsEmail(options, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_EMAIL,
      constraints: [options],
      validator: {
        validate: (value, args) => isEmail(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be an email", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_EMAIL,
  IsEmail,
  isEmail
});
//# sourceMappingURL=IsEmail.js.map
