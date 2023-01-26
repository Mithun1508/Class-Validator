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
var IsObject_exports = {};
__export(IsObject_exports, {
  IS_OBJECT: () => IS_OBJECT,
  IsObject: () => IsObject,
  isObject: () => isObject
});
module.exports = __toCommonJS(IsObject_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_OBJECT = "isObject";
function isObject(value) {
  return value != null && (typeof value === "object" || typeof value === "function") && !Array.isArray(value);
}
function IsObject(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_OBJECT,
      validator: {
        validate: (value, args) => isObject(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be an object", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_OBJECT,
  IsObject,
  isObject
});
//# sourceMappingURL=IsObject.js.map
