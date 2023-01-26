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
var IsMacAddress_exports = {};
__export(IsMacAddress_exports, {
  IS_MAC_ADDRESS: () => IS_MAC_ADDRESS,
  IsMACAddress: () => IsMACAddress,
  isMACAddress: () => isMACAddress
});
module.exports = __toCommonJS(IsMacAddress_exports);
var import_ValidationOptions = require("../ValidationOptions");
var import_ValidateBy = require("../common/ValidateBy");
var import_isMACAddress = __toESM(require("validator/lib/isMACAddress"));
const IS_MAC_ADDRESS = "isMacAddress";
function isMACAddress(value, options) {
  return typeof value === "string" && (0, import_isMACAddress.default)(value, options);
}
function IsMACAddress(optionsOrValidationOptionsArg, validationOptionsArg) {
  const options = !(0, import_ValidationOptions.isValidationOptions)(optionsOrValidationOptionsArg) ? optionsOrValidationOptionsArg : void 0;
  const validationOptions = (0, import_ValidationOptions.isValidationOptions)(optionsOrValidationOptionsArg) ? optionsOrValidationOptionsArg : validationOptionsArg;
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_MAC_ADDRESS,
      constraints: [options],
      validator: {
        validate: (value, args) => isMACAddress(value, options),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be a MAC Address", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_MAC_ADDRESS,
  IsMACAddress,
  isMACAddress
});
//# sourceMappingURL=IsMacAddress.js.map
