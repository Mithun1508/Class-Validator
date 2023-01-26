"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ArrayNotEmpty_exports = {};
__export(ArrayNotEmpty_exports, {
  ARRAY_NOT_EMPTY: () => ARRAY_NOT_EMPTY,
  ArrayNotEmpty: () => ArrayNotEmpty,
  arrayNotEmpty: () => arrayNotEmpty
});
module.exports = __toCommonJS(ArrayNotEmpty_exports);
var import_ValidateBy = require("../common/ValidateBy");
const ARRAY_NOT_EMPTY = "arrayNotEmpty";
function arrayNotEmpty(array) {
  return array instanceof Array && array.length > 0;
}
function ArrayNotEmpty(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: ARRAY_NOT_EMPTY,
      validator: {
        validate: (value, args) => arrayNotEmpty(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property should not be empty", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ARRAY_NOT_EMPTY,
  ArrayNotEmpty,
  arrayNotEmpty
});
//# sourceMappingURL=ArrayNotEmpty.js.map
