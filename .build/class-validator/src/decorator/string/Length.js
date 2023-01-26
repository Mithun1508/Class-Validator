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
var Length_exports = {};
__export(Length_exports, {
  IS_LENGTH: () => IS_LENGTH,
  Length: () => Length,
  length: () => length
});
module.exports = __toCommonJS(Length_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isLength = __toESM(require("validator/lib/isLength"));
const IS_LENGTH = "isLength";
function length(value, min, max) {
  return typeof value === "string" && (0, import_isLength.default)(value, { min, max });
}
function Length(min, max, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_LENGTH,
      constraints: [min, max],
      validator: {
        validate: (value, args) => length(value, args.constraints[0], args.constraints[1]),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix, args) => {
          const isMinLength = args.constraints[0] !== null && args.constraints[0] !== void 0;
          const isMaxLength = args.constraints[1] !== null && args.constraints[1] !== void 0;
          if (isMinLength && (!args.value || args.value.length < args.constraints[0])) {
            return eachPrefix + "$property must be longer than or equal to $constraint1 characters";
          } else if (isMaxLength && args.value.length > args.constraints[1]) {
            return eachPrefix + "$property must be shorter than or equal to $constraint2 characters";
          }
          return eachPrefix + "$property must be longer than or equal to $constraint1 and shorter than or equal to $constraint2 characters";
        }, validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_LENGTH,
  Length,
  length
});
//# sourceMappingURL=Length.js.map
