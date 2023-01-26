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
var Min_exports = {};
__export(Min_exports, {
  MIN: () => MIN,
  Min: () => Min,
  min: () => min
});
module.exports = __toCommonJS(Min_exports);
var import_ValidateBy = require("../common/ValidateBy");
const MIN = "min";
function min(num, min2) {
  return typeof num === "number" && typeof min2 === "number" && num >= min2;
}
function Min(minValue, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: MIN,
      constraints: [minValue],
      validator: {
        validate: (value, args) => min(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must not be less than $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MIN,
  Min,
  min
});
//# sourceMappingURL=Min.js.map
