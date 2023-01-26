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
var IsPhoneNumber_exports = {};
__export(IsPhoneNumber_exports, {
  IS_PHONE_NUMBER: () => IS_PHONE_NUMBER,
  IsPhoneNumber: () => IsPhoneNumber,
  isPhoneNumber: () => isPhoneNumber
});
module.exports = __toCommonJS(IsPhoneNumber_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_libphonenumber_js = require("libphonenumber-js");
const IS_PHONE_NUMBER = "isPhoneNumber";
function isPhoneNumber(value, region) {
  try {
    const phoneNum = (0, import_libphonenumber_js.parsePhoneNumberFromString)(value, region);
    const result = phoneNum == null ? void 0 : phoneNum.isValid();
    return !!result;
  } catch (error) {
    return false;
  }
}
function IsPhoneNumber(region, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_PHONE_NUMBER,
      constraints: [region],
      validator: {
        validate: (value, args) => isPhoneNumber(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid phone number",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_PHONE_NUMBER,
  IsPhoneNumber,
  isPhoneNumber
});
//# sourceMappingURL=IsPhoneNumber.js.map
