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
var IsNotEmpty_exports = {};
__export(IsNotEmpty_exports, {
  IS_NOT_EMPTY: () => IS_NOT_EMPTY,
  IsNotEmpty: () => IsNotEmpty,
  isNotEmpty: () => isNotEmpty
});
module.exports = __toCommonJS(IsNotEmpty_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_NOT_EMPTY = "isNotEmpty";
function isNotEmpty(value) {
  return value !== "" && value !== null && value !== void 0;
}
function IsNotEmpty(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_NOT_EMPTY,
      validator: {
        validate: (value, args) => isNotEmpty(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property should not be empty", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_NOT_EMPTY,
  IsNotEmpty,
  isNotEmpty
});
//# sourceMappingURL=IsNotEmpty.js.map
