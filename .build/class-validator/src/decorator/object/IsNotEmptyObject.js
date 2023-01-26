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
var IsNotEmptyObject_exports = {};
__export(IsNotEmptyObject_exports, {
  IS_NOT_EMPTY_OBJECT: () => IS_NOT_EMPTY_OBJECT,
  IsNotEmptyObject: () => IsNotEmptyObject,
  isNotEmptyObject: () => isNotEmptyObject
});
module.exports = __toCommonJS(IsNotEmptyObject_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_IsObject = require("../typechecker/IsObject");
const IS_NOT_EMPTY_OBJECT = "isNotEmptyObject";
function isNotEmptyObject(value, options) {
  if (!(0, import_IsObject.isObject)(value)) {
    return false;
  }
  if ((options == null ? void 0 : options.nullable) === true) {
    return !Object.values(value).every((propertyValue) => propertyValue === null || propertyValue === void 0);
  }
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}
function IsNotEmptyObject(options, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_NOT_EMPTY_OBJECT,
      constraints: [options],
      validator: {
        validate: (value, args) => isNotEmptyObject(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a non-empty object",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_NOT_EMPTY_OBJECT,
  IsNotEmptyObject,
  isNotEmptyObject
});
//# sourceMappingURL=IsNotEmptyObject.js.map
