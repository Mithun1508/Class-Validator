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
var IsEthereumAddress_exports = {};
__export(IsEthereumAddress_exports, {
  IS_ETHEREUM_ADDRESS: () => IS_ETHEREUM_ADDRESS,
  IsEthereumAddress: () => IsEthereumAddress,
  isEthereumAddress: () => isEthereumAddress
});
module.exports = __toCommonJS(IsEthereumAddress_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isEthereumAddress = __toESM(require("validator/lib/isEthereumAddress"));
const IS_ETHEREUM_ADDRESS = "isEthereumAddress";
function isEthereumAddress(value) {
  return typeof value === "string" && (0, import_isEthereumAddress.default)(value);
}
function IsEthereumAddress(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_ETHEREUM_ADDRESS,
      validator: {
        validate: (value, args) => isEthereumAddress(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be an Ethereum address",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_ETHEREUM_ADDRESS,
  IsEthereumAddress,
  isEthereumAddress
});
//# sourceMappingURL=IsEthereumAddress.js.map
