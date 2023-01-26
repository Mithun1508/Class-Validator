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
var ValidationOptions_exports = {};
__export(ValidationOptions_exports, {
  isValidationOptions: () => isValidationOptions
});
module.exports = __toCommonJS(ValidationOptions_exports);
function isValidationOptions(val) {
  if (!val) {
    return false;
  }
  return "each" in val || "message" in val || "groups" in val || "always" in val || "context" in val;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidationOptions
});
//# sourceMappingURL=ValidationOptions.js.map
