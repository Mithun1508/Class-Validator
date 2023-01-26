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
var IsNegative_exports = {};
__export(IsNegative_exports, {
  IS_NEGATIVE: () => IS_NEGATIVE,
  IsNegative: () => IsNegative,
  isNegative: () => isNegative
});
module.exports = __toCommonJS(IsNegative_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_NEGATIVE = "isNegative";
function isNegative(value) {
  return typeof value === "number" && value < 0;
}
function IsNegative(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_NEGATIVE,
      validator: {
        validate: (value, args) => isNegative(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a negative number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_NEGATIVE,
  IsNegative,
  isNegative
});
//# sourceMappingURL=IsNegative.js.map
