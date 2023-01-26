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
var IsByteLength_exports = {};
__export(IsByteLength_exports, {
  IS_BYTE_LENGTH: () => IS_BYTE_LENGTH,
  IsByteLength: () => IsByteLength,
  isByteLength: () => isByteLength
});
module.exports = __toCommonJS(IsByteLength_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isByteLength = __toESM(require("validator/lib/isByteLength"));
const IS_BYTE_LENGTH = "isByteLength";
function isByteLength(value, min, max) {
  return typeof value === "string" && (0, import_isByteLength.default)(value, { min, max });
}
function IsByteLength(min, max, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_BYTE_LENGTH,
      constraints: [min, max],
      validator: {
        validate: (value, args) => isByteLength(value, args.constraints[0], args.constraints[1]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property's byte length must fall into ($constraint1, $constraint2) range",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_BYTE_LENGTH,
  IsByteLength,
  isByteLength
});
//# sourceMappingURL=IsByteLength.js.map
