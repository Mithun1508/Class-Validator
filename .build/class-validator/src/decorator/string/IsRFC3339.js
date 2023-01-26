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
var IsRFC3339_exports = {};
__export(IsRFC3339_exports, {
  IS_RFC_3339: () => IS_RFC_3339,
  IsRFC3339: () => IsRFC3339,
  isRFC3339: () => isRFC3339
});
module.exports = __toCommonJS(IsRFC3339_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isRFC3339 = __toESM(require("validator/lib/isRFC3339"));
const IS_RFC_3339 = "isRFC3339";
function isRFC3339(value) {
  return typeof value === "string" && (0, import_isRFC3339.default)(value);
}
function IsRFC3339(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_RFC_3339,
      validator: {
        validate: (value, args) => isRFC3339(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be RFC 3339 date", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_RFC_3339,
  IsRFC3339,
  isRFC3339
});
//# sourceMappingURL=IsRFC3339.js.map
