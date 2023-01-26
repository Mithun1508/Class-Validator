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
var Validate_exports = {};
__export(Validate_exports, {
  Validate: () => Validate,
  ValidatorConstraint: () => ValidatorConstraint
});
module.exports = __toCommonJS(Validate_exports);
var import_ValidationMetadata = require("../../metadata/ValidationMetadata");
var import_MetadataStorage = require("../../metadata/MetadataStorage");
var import_ValidationTypes = require("../../validation/ValidationTypes");
var import_ConstraintMetadata = require("../../metadata/ConstraintMetadata");
function ValidatorConstraint(options) {
  return function(target) {
    const isAsync = options && options.async;
    let name = options && options.name ? options.name : "";
    if (!name) {
      name = target.name;
      if (!name)
        name = name.replace(/\.?([A-Z]+)/g, (x, y) => "_" + y.toLowerCase()).replace(/^_/, "");
    }
    const metadata = new import_ConstraintMetadata.ConstraintMetadata(target, name, isAsync);
    (0, import_MetadataStorage.getMetadataStorage)().addConstraintMetadata(metadata);
  };
}
function Validate(constraintClass, constraintsOrValidationOptions, maybeValidationOptions) {
  return function(object, propertyName) {
    const args = {
      type: import_ValidationTypes.ValidationTypes.CUSTOM_VALIDATION,
      target: object.constructor,
      propertyName,
      constraintCls: constraintClass,
      constraints: constraintsOrValidationOptions instanceof Array ? constraintsOrValidationOptions : void 0,
      validationOptions: !(constraintsOrValidationOptions instanceof Array) ? constraintsOrValidationOptions : maybeValidationOptions
    };
    (0, import_MetadataStorage.getMetadataStorage)().addValidationMetadata(new import_ValidationMetadata.ValidationMetadata(args));
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Validate,
  ValidatorConstraint
});
//# sourceMappingURL=Validate.js.map
