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
var IsEmpty_exports = {};
__export(IsEmpty_exports, {
  IS_EMPTY: () => IS_EMPTY,
  IsEmpty: () => IsEmpty,
  isEmpty: () => isEmpty
});
module.exports = __toCommonJS(IsEmpty_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_EMPTY = "isEmpty";
function isEmpty(value) {
  return value === "" || value === null || value === void 0;
}
function IsEmpty(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_EMPTY,
      validator: {
        validate: (value, args) => isEmpty(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be empty", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_EMPTY,
  IsEmpty,
  isEmpty
});
//# sourceMappingURL=IsEmpty.js.map
