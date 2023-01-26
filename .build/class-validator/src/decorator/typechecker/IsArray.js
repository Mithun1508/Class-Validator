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
var IsArray_exports = {};
__export(IsArray_exports, {
  IS_ARRAY: () => IS_ARRAY,
  IsArray: () => IsArray,
  isArray: () => isArray
});
module.exports = __toCommonJS(IsArray_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_ARRAY = "isArray";
function isArray(value) {
  return value instanceof Array;
}
function IsArray(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_ARRAY,
      validator: {
        validate: (value, args) => isArray(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be an array", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_ARRAY,
  IsArray,
  isArray
});
//# sourceMappingURL=IsArray.js.map
