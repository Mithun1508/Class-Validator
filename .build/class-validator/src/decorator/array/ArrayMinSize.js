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
var ArrayMinSize_exports = {};
__export(ArrayMinSize_exports, {
  ARRAY_MIN_SIZE: () => ARRAY_MIN_SIZE,
  ArrayMinSize: () => ArrayMinSize,
  arrayMinSize: () => arrayMinSize
});
module.exports = __toCommonJS(ArrayMinSize_exports);
var import_ValidateBy = require("../common/ValidateBy");
const ARRAY_MIN_SIZE = "arrayMinSize";
function arrayMinSize(array, min) {
  return array instanceof Array && array.length >= min;
}
function ArrayMinSize(min, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: ARRAY_MIN_SIZE,
      constraints: [min],
      validator: {
        validate: (value, args) => arrayMinSize(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must contain at least $constraint1 elements",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ARRAY_MIN_SIZE,
  ArrayMinSize,
  arrayMinSize
});
//# sourceMappingURL=ArrayMinSize.js.map
