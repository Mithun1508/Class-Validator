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
var IsDataURI_exports = {};
__export(IsDataURI_exports, {
  IS_DATA_URI: () => IS_DATA_URI,
  IsDataURI: () => IsDataURI,
  isDataURI: () => isDataURI
});
module.exports = __toCommonJS(IsDataURI_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isDataURI = __toESM(require("validator/lib/isDataURI"));
const IS_DATA_URI = "isDataURI";
function isDataURI(value) {
  return typeof value === "string" && (0, import_isDataURI.default)(value);
}
function IsDataURI(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_DATA_URI,
      validator: {
        validate: (value, args) => isDataURI(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a data uri format",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_DATA_URI,
  IsDataURI,
  isDataURI
});
//# sourceMappingURL=IsDataURI.js.map
