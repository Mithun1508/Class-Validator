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
var IsFirebasePushId_exports = {};
__export(IsFirebasePushId_exports, {
  IS_FIREBASE_PUSH_ID: () => IS_FIREBASE_PUSH_ID,
  IsFirebasePushId: () => IsFirebasePushId,
  isFirebasePushId: () => isFirebasePushId
});
module.exports = __toCommonJS(IsFirebasePushId_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_FIREBASE_PUSH_ID = "IsFirebasePushId";
function isFirebasePushId(value) {
  const webSafeRegex = /^[a-zA-Z0-9_-]*$/;
  return typeof value === "string" && value.length === 20 && webSafeRegex.test(value);
}
function IsFirebasePushId(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_FIREBASE_PUSH_ID,
      validator: {
        validate: (value, args) => isFirebasePushId(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a Firebase Push Id",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_FIREBASE_PUSH_ID,
  IsFirebasePushId,
  isFirebasePushId
});
//# sourceMappingURL=IsFirebasePushId.js.map
