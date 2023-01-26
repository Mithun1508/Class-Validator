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
var Equals_exports = {};
__export(Equals_exports, {
  EQUALS: () => EQUALS,
  Equals: () => Equals,
  equals: () => equals
});
module.exports = __toCommonJS(Equals_exports);
var import_ValidateBy = require("../common/ValidateBy");
const EQUALS = "equals";
function equals(value, comparison) {
  return value === comparison;
}
function Equals(comparison, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: EQUALS,
      constraints: [comparison],
      validator: {
        validate: (value, args) => equals(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be equal to $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EQUALS,
  Equals,
  equals
});
//# sourceMappingURL=Equals.js.map
