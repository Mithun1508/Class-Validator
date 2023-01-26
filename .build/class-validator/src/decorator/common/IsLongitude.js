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
var IsLongitude_exports = {};
__export(IsLongitude_exports, {
  IS_LONGITUDE: () => IS_LONGITUDE,
  IsLongitude: () => IsLongitude,
  isLongitude: () => isLongitude
});
module.exports = __toCommonJS(IsLongitude_exports);
var import_ValidateBy = require("./ValidateBy");
var import_IsLatLong = require("./IsLatLong");
const IS_LONGITUDE = "isLongitude";
function isLongitude(value) {
  return (typeof value === "number" || typeof value === "string") && (0, import_IsLatLong.isLatLong)(`0,${value}`);
}
function IsLongitude(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_LONGITUDE,
      validator: {
        validate: (value, args) => isLongitude(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a longitude string or number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_LONGITUDE,
  IsLongitude,
  isLongitude
});
//# sourceMappingURL=IsLongitude.js.map
