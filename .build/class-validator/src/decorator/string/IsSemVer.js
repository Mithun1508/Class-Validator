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
var IsSemVer_exports = {};
__export(IsSemVer_exports, {
  IS_SEM_VER: () => IS_SEM_VER,
  IsSemVer: () => IsSemVer,
  isSemVer: () => isSemVer
});
module.exports = __toCommonJS(IsSemVer_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isSemVer = __toESM(require("validator/lib/isSemVer"));
const IS_SEM_VER = "isSemVer";
function isSemVer(value) {
  return typeof value === "string" && (0, import_isSemVer.default)(value);
}
function IsSemVer(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_SEM_VER,
      validator: {
        validate: (value, args) => isSemVer(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a Semantic Versioning Specification",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_SEM_VER,
  IsSemVer,
  isSemVer
});
//# sourceMappingURL=IsSemVer.js.map
