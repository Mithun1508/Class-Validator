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
var NotEquals_exports = {};
__export(NotEquals_exports, {
  NOT_EQUALS: () => NOT_EQUALS,
  NotEquals: () => NotEquals,
  notEquals: () => notEquals
});
module.exports = __toCommonJS(NotEquals_exports);
var import_ValidateBy = require("../common/ValidateBy");
const NOT_EQUALS = "notEquals";
function notEquals(value, comparison) {
  return value !== comparison;
}
function NotEquals(comparison, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: NOT_EQUALS,
      constraints: [comparison],
      validator: {
        validate: (value, args) => notEquals(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property should not be equal to $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NOT_EQUALS,
  NotEquals,
  notEquals
});
//# sourceMappingURL=NotEquals.js.map
