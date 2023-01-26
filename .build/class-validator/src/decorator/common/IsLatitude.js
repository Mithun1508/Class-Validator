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
var IsLatitude_exports = {};
__export(IsLatitude_exports, {
  IS_LATITUDE: () => IS_LATITUDE,
  IsLatitude: () => IsLatitude,
  isLatitude: () => isLatitude
});
module.exports = __toCommonJS(IsLatitude_exports);
var import_ValidateBy = require("./ValidateBy");
var import_IsLatLong = require("./IsLatLong");
const IS_LATITUDE = "isLatitude";
function isLatitude(value) {
  return (typeof value === "number" || typeof value === "string") && (0, import_IsLatLong.isLatLong)(`${value},0`);
}
function IsLatitude(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_LATITUDE,
      validator: {
        validate: (value, args) => isLatitude(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a latitude string or number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_LATITUDE,
  IsLatitude,
  isLatitude
});
//# sourceMappingURL=IsLatitude.js.map
