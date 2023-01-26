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
var IsDivisibleBy_exports = {};
__export(IsDivisibleBy_exports, {
  IS_DIVISIBLE_BY: () => IS_DIVISIBLE_BY,
  IsDivisibleBy: () => IsDivisibleBy,
  isDivisibleBy: () => isDivisibleBy
});
module.exports = __toCommonJS(IsDivisibleBy_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isDivisibleBy = __toESM(require("validator/lib/isDivisibleBy"));
const IS_DIVISIBLE_BY = "isDivisibleBy";
function isDivisibleBy(value, num) {
  return typeof value === "number" && typeof num === "number" && (0, import_isDivisibleBy.default)(String(value), num);
}
function IsDivisibleBy(num, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_DIVISIBLE_BY,
      constraints: [num],
      validator: {
        validate: (value, args) => isDivisibleBy(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be divisible by $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_DIVISIBLE_BY,
  IsDivisibleBy,
  isDivisibleBy
});
//# sourceMappingURL=IsDivisibleBy.js.map
