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
var IsBoolean_exports = {};
__export(IsBoolean_exports, {
  IS_BOOLEAN: () => IS_BOOLEAN,
  IsBoolean: () => IsBoolean,
  isBoolean: () => isBoolean
});
module.exports = __toCommonJS(IsBoolean_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_BOOLEAN = "isBoolean";
function isBoolean(value) {
  return value instanceof Boolean || typeof value === "boolean";
}
function IsBoolean(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_BOOLEAN,
      validator: {
        validate: (value, args) => isBoolean(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be a boolean value", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_BOOLEAN,
  IsBoolean,
  isBoolean
});
//# sourceMappingURL=IsBoolean.js.map
