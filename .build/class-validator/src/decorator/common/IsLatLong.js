"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var IsLatLong_exports = {};
__export(IsLatLong_exports, {
  IS_LATLONG: () => IS_LATLONG,
  IsLatLong: () => IsLatLong,
  isLatLong: () => isLatLong
});
module.exports = __toCommonJS(IsLatLong_exports);
var import_ValidateBy = require("./ValidateBy");
var import_isLatLong = __toESM(require("validator/lib/isLatLong"));
const IS_LATLONG = "isLatLong";
function isLatLong(value) {
  return typeof value === "string" && (0, import_isLatLong.default)(value);
}
function IsLatLong(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_LATLONG,
      validator: {
        validate: (value, args) => isLatLong(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a latitude,longitude string",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_LATLONG,
  IsLatLong,
  isLatLong
});
//# sourceMappingURL=IsLatLong.js.map
