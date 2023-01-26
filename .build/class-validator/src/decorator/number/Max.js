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
var Max_exports = {};
__export(Max_exports, {
  MAX: () => MAX,
  Max: () => Max,
  max: () => max
});
module.exports = __toCommonJS(Max_exports);
var import_ValidateBy = require("../common/ValidateBy");
const MAX = "max";
function max(num, max2) {
  return typeof num === "number" && typeof max2 === "number" && num <= max2;
}
function Max(maxValue, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: MAX,
      constraints: [maxValue],
      validator: {
        validate: (value, args) => max(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must not be greater than $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX,
  Max,
  max
});
//# sourceMappingURL=Max.js.map
