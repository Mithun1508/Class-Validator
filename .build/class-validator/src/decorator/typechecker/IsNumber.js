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
var IsNumber_exports = {};
__export(IsNumber_exports, {
  IS_NUMBER: () => IS_NUMBER,
  IsNumber: () => IsNumber,
  isNumber: () => isNumber
});
module.exports = __toCommonJS(IsNumber_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_NUMBER = "isNumber";
function isNumber(value, options = {}) {
  if (typeof value !== "number") {
    return false;
  }
  if (value === Infinity || value === -Infinity) {
    return options.allowInfinity;
  }
  if (Number.isNaN(value)) {
    return options.allowNaN;
  }
  if (options.maxDecimalPlaces !== void 0) {
    let decimalPlaces = 0;
    if (value % 1 !== 0) {
      decimalPlaces = value.toString().split(".")[1].length;
    }
    if (decimalPlaces > options.maxDecimalPlaces) {
      return false;
    }
  }
  return Number.isFinite(value);
}
function IsNumber(options = {}, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_NUMBER,
      constraints: [options],
      validator: {
        validate: (value, args) => isNumber(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a number conforming to the specified constraints",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_NUMBER,
  IsNumber,
  isNumber
});
//# sourceMappingURL=IsNumber.js.map
