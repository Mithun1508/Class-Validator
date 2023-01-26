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
var ArrayContains_exports = {};
__export(ArrayContains_exports, {
  ARRAY_CONTAINS: () => ARRAY_CONTAINS,
  ArrayContains: () => ArrayContains,
  arrayContains: () => arrayContains
});
module.exports = __toCommonJS(ArrayContains_exports);
var import_ValidateBy = require("../common/ValidateBy");
const ARRAY_CONTAINS = "arrayContains";
function arrayContains(array, values) {
  if (!(array instanceof Array))
    return false;
  return values.every((value) => array.indexOf(value) !== -1);
}
function ArrayContains(values, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: ARRAY_CONTAINS,
      constraints: [values],
      validator: {
        validate: (value, args) => arrayContains(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must contain $constraint1 values",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ARRAY_CONTAINS,
  ArrayContains,
  arrayContains
});
//# sourceMappingURL=ArrayContains.js.map
