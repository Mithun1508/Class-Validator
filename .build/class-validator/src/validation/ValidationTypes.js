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
var ValidationTypes_exports = {};
__export(ValidationTypes_exports, {
  ValidationTypes: () => ValidationTypes
});
module.exports = __toCommonJS(ValidationTypes_exports);
class ValidationTypes {
  static isValid(type) {
    return type !== "isValid" && type !== "getMessage" && Object.keys(this).map((key) => this[key]).indexOf(type) !== -1;
  }
}
ValidationTypes.CUSTOM_VALIDATION = "customValidation";
ValidationTypes.NESTED_VALIDATION = "nestedValidation";
ValidationTypes.PROMISE_VALIDATION = "promiseValidation";
ValidationTypes.CONDITIONAL_VALIDATION = "conditionalValidation";
ValidationTypes.WHITELIST = "whitelistValidation";
ValidationTypes.IS_DEFINED = "isDefined";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationTypes
});
//# sourceMappingURL=ValidationTypes.js.map
