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
var IsHash_exports = {};
__export(IsHash_exports, {
  IS_HASH: () => IS_HASH,
  IsHash: () => IsHash,
  isHash: () => isHash
});
module.exports = __toCommonJS(IsHash_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isHash = __toESM(require("validator/lib/isHash"));
const IS_HASH = "isHash";
function isHash(value, algorithm) {
  return typeof value === "string" && (0, import_isHash.default)(value, algorithm);
}
function IsHash(algorithm, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_HASH,
      constraints: [algorithm],
      validator: {
        validate: (value, args) => isHash(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a hash of type $constraint1",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_HASH,
  IsHash,
  isHash
});
//# sourceMappingURL=IsHash.js.map
