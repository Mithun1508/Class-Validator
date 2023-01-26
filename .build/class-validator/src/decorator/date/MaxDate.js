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
var MaxDate_exports = {};
__export(MaxDate_exports, {
  MAX_DATE: () => MAX_DATE,
  MaxDate: () => MaxDate,
  maxDate: () => maxDate
});
module.exports = __toCommonJS(MaxDate_exports);
var import_ValidateBy = require("../common/ValidateBy");
const MAX_DATE = "maxDate";
function maxDate(date, maxDate2) {
  return date instanceof Date && date.getTime() <= maxDate2.getTime();
}
function MaxDate(date, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: MAX_DATE,
      constraints: [date],
      validator: {
        validate: (value, args) => maxDate(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => "maximal allowed date for " + eachPrefix + "$property is $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_DATE,
  MaxDate,
  maxDate
});
//# sourceMappingURL=MaxDate.js.map
