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
var MinDate_exports = {};
__export(MinDate_exports, {
  MIN_DATE: () => MIN_DATE,
  MinDate: () => MinDate,
  minDate: () => minDate
});
module.exports = __toCommonJS(MinDate_exports);
var import_ValidateBy = require("../common/ValidateBy");
const MIN_DATE = "minDate";
function minDate(date, minDate2) {
  return date instanceof Date && date.getTime() >= minDate2.getTime();
}
function MinDate(date, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: MIN_DATE,
      constraints: [date],
      validator: {
        validate: (value, args) => minDate(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => "minimal allowed date for " + eachPrefix + "$property is $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MIN_DATE,
  MinDate,
  minDate
});
//# sourceMappingURL=MinDate.js.map
