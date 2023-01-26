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
var IsDate_exports = {};
__export(IsDate_exports, {
  IS_DATE: () => IS_DATE,
  IsDate: () => IsDate,
  isDate: () => isDate
});
module.exports = __toCommonJS(IsDate_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_DATE = "isDate";
function isDate(value) {
  return value instanceof Date && !isNaN(value.getTime());
}
function IsDate(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_DATE,
      validator: {
        validate: (value, args) => isDate(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be a Date instance", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_DATE,
  IsDate,
  isDate
});
//# sourceMappingURL=IsDate.js.map
