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
var IsInt_exports = {};
__export(IsInt_exports, {
  IS_INT: () => IS_INT,
  IsInt: () => IsInt,
  isInt: () => isInt
});
module.exports = __toCommonJS(IsInt_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_INT = "isInt";
function isInt(val) {
  return typeof val === "number" && Number.isInteger(val);
}
function IsInt(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_INT,
      validator: {
        validate: (value, args) => isInt(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be an integer number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_INT,
  IsInt,
  isInt
});
//# sourceMappingURL=IsInt.js.map
