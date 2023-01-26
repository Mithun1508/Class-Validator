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
var IsDateString_exports = {};
__export(IsDateString_exports, {
  IS_DATE_STRING: () => IS_DATE_STRING,
  IsDateString: () => IsDateString,
  isDateString: () => isDateString
});
module.exports = __toCommonJS(IsDateString_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_IsISO8601 = require("./IsISO8601");
const IS_DATE_STRING = "isDateString";
function isDateString(value, options) {
  return (0, import_IsISO8601.isISO8601)(value, options);
}
function IsDateString(options, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_DATE_STRING,
      constraints: [options],
      validator: {
        validate: (value, args) => isDateString(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid ISO 8601 date string",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_DATE_STRING,
  IsDateString,
  isDateString
});
//# sourceMappingURL=IsDateString.js.map
