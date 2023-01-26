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
var register_decorator_exports = {};
__export(register_decorator_exports, {
  registerDecorator: () => registerDecorator
});
module.exports = __toCommonJS(register_decorator_exports);
var import_ConstraintMetadata = require("./metadata/ConstraintMetadata");
var import_ValidationMetadata = require("./metadata/ValidationMetadata");
var import_ValidationTypes = require("./validation/ValidationTypes");
var import_container = require("./container");
var import_MetadataStorage = require("./metadata/MetadataStorage");
function registerDecorator(options) {
  let constraintCls;
  if (options.validator instanceof Function) {
    constraintCls = options.validator;
    const constraintClasses = (0, import_container.getFromContainer)(import_MetadataStorage.MetadataStorage).getTargetValidatorConstraints(options.validator);
    if (constraintClasses.length > 1) {
      throw `More than one implementation of ValidatorConstraintInterface found for validator on: ${options.target.name}:${options.propertyName}`;
    }
  } else {
    const validator = options.validator;
    constraintCls = class CustomConstraint {
      validate(value, validationArguments) {
        return validator.validate(value, validationArguments);
      }
      defaultMessage(validationArguments) {
        if (validator.defaultMessage) {
          return validator.defaultMessage(validationArguments);
        }
        return "";
      }
    };
    (0, import_MetadataStorage.getMetadataStorage)().addConstraintMetadata(new import_ConstraintMetadata.ConstraintMetadata(constraintCls, options.name, options.async));
  }
  const validationMetadataArgs = {
    type: options.name && import_ValidationTypes.ValidationTypes.isValid(options.name) ? options.name : import_ValidationTypes.ValidationTypes.CUSTOM_VALIDATION,
    target: options.target,
    propertyName: options.propertyName,
    validationOptions: options.options,
    constraintCls,
    constraints: options.constraints
  };
  (0, import_MetadataStorage.getMetadataStorage)().addValidationMetadata(new import_ValidationMetadata.ValidationMetadata(validationMetadataArgs));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerDecorator
});
//# sourceMappingURL=register-decorator.js.map
