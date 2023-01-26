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
var ArrayMaxSize_exports = {};
__export(ArrayMaxSize_exports, {
  ARRAY_MAX_SIZE: () => ARRAY_MAX_SIZE,
  ArrayMaxSize: () => ArrayMaxSize,
  arrayMaxSize: () => arrayMaxSize
});
module.exports = __toCommonJS(ArrayMaxSize_exports);
var import_ValidateBy = require("../common/ValidateBy");
const ARRAY_MAX_SIZE = "arrayMaxSize";
function arrayMaxSize(array, max) {
  return array instanceof Array && array.length <= max;
}
function ArrayMaxSize(max, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: ARRAY_MAX_SIZE,
      constraints: [max],
      validator: {
        validate: (value, args) => arrayMaxSize(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must contain not more than $constraint1 elements",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ARRAY_MAX_SIZE,
  ArrayMaxSize,
  arrayMaxSize
});
//# sourceMappingURL=ArrayMaxSize.js.map
