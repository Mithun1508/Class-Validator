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
var IsIn_exports = {};
__export(IsIn_exports, {
  IS_IN: () => IS_IN,
  IsIn: () => IsIn,
  isIn: () => isIn
});
module.exports = __toCommonJS(IsIn_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_IN = "isIn";
function isIn(value, possibleValues) {
  return !(possibleValues instanceof Array) || possibleValues.some((possibleValue) => possibleValue === value);
}
function IsIn(values, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_IN,
      constraints: [values],
      validator: {
        validate: (value, args) => isIn(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be one of the following values: $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_IN,
  IsIn,
  isIn
});
//# sourceMappingURL=IsIn.js.map
