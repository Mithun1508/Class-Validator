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
var IsDefined_exports = {};
__export(IsDefined_exports, {
  IS_DEFINED: () => IS_DEFINED,
  IsDefined: () => IsDefined,
  isDefined: () => isDefined
});
module.exports = __toCommonJS(IsDefined_exports);
var import_ValidateBy = require("./ValidateBy");
var import_ValidationTypes = require("../../validation/ValidationTypes");
const IS_DEFINED = import_ValidationTypes.ValidationTypes.IS_DEFINED;
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function IsDefined(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_DEFINED,
      validator: {
        validate: (value) => isDefined(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property should not be null or undefined",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_DEFINED,
  IsDefined,
  isDefined
});
//# sourceMappingURL=IsDefined.js.map
