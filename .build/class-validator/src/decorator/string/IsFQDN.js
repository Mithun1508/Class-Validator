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
var IsFQDN_exports = {};
__export(IsFQDN_exports, {
  IS_FQDN: () => IS_FQDN,
  IsFQDN: () => IsFQDN,
  isFQDN: () => isFQDN
});
module.exports = __toCommonJS(IsFQDN_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isFQDN = __toESM(require("validator/lib/isFQDN"));
const IS_FQDN = "isFqdn";
function isFQDN(value, options) {
  return typeof value === "string" && (0, import_isFQDN.default)(value, options);
}
function IsFQDN(options, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_FQDN,
      constraints: [options],
      validator: {
        validate: (value, args) => isFQDN(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid domain name",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_FQDN,
  IsFQDN,
  isFQDN
});
//# sourceMappingURL=IsFQDN.js.map
