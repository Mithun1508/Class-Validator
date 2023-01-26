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
var IsOptional_exports = {};
__export(IsOptional_exports, {
  IsOptional: () => IsOptional
});
module.exports = __toCommonJS(IsOptional_exports);
var import_ValidationTypes = require("../../validation/ValidationTypes");
var import_ValidationMetadata = require("../../metadata/ValidationMetadata");
var import_MetadataStorage = require("../../metadata/MetadataStorage");
function IsOptional(validationOptions) {
  return function(object, propertyName) {
    const args = {
      type: import_ValidationTypes.ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName,
      constraints: [
        (object2, value) => {
          return object2[propertyName] !== null && object2[propertyName] !== void 0;
        }
      ],
      validationOptions
    };
    (0, import_MetadataStorage.getMetadataStorage)().addValidationMetadata(new import_ValidationMetadata.ValidationMetadata(args));
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IsOptional
});
//# sourceMappingURL=IsOptional.js.map