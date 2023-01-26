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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  registerSchema: () => registerSchema,
  validate: () => validate,
  validateOrReject: () => validateOrReject,
  validateSync: () => validateSync
});
module.exports = __toCommonJS(src_exports);
var import_MetadataStorage = require("./metadata/MetadataStorage");
var import_Validator = require("./validation/Validator");
var import_container = require("./container");
__reExport(src_exports, require("./container"), module.exports);
__reExport(src_exports, require("./decorator/decorators"), module.exports);
__reExport(src_exports, require("./decorator/ValidationOptions"), module.exports);
__reExport(src_exports, require("./validation/ValidatorConstraintInterface"), module.exports);
__reExport(src_exports, require("./validation/ValidationError"), module.exports);
__reExport(src_exports, require("./validation/ValidatorOptions"), module.exports);
__reExport(src_exports, require("./validation/ValidationArguments"), module.exports);
__reExport(src_exports, require("./validation/ValidationTypes"), module.exports);
__reExport(src_exports, require("./validation/Validator"), module.exports);
__reExport(src_exports, require("./validation-schema/ValidationSchema"), module.exports);
__reExport(src_exports, require("./register-decorator"), module.exports);
__reExport(src_exports, require("./metadata/MetadataStorage"), module.exports);
function validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
  if (typeof schemaNameOrObject === "string") {
    return (0, import_container.getFromContainer)(import_Validator.Validator).validate(
      schemaNameOrObject,
      objectOrValidationOptions,
      maybeValidatorOptions
    );
  } else {
    return (0, import_container.getFromContainer)(import_Validator.Validator).validate(schemaNameOrObject, objectOrValidationOptions);
  }
}
function validateOrReject(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
  if (typeof schemaNameOrObject === "string") {
    return (0, import_container.getFromContainer)(import_Validator.Validator).validateOrReject(
      schemaNameOrObject,
      objectOrValidationOptions,
      maybeValidatorOptions
    );
  } else {
    return (0, import_container.getFromContainer)(import_Validator.Validator).validateOrReject(
      schemaNameOrObject,
      objectOrValidationOptions
    );
  }
}
function validateSync(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
  if (typeof schemaNameOrObject === "string") {
    return (0, import_container.getFromContainer)(import_Validator.Validator).validateSync(
      schemaNameOrObject,
      objectOrValidationOptions,
      maybeValidatorOptions
    );
  } else {
    return (0, import_container.getFromContainer)(import_Validator.Validator).validateSync(schemaNameOrObject, objectOrValidationOptions);
  }
}
function registerSchema(schema) {
  (0, import_MetadataStorage.getMetadataStorage)().addValidationSchema(schema);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerSchema,
  validate,
  validateOrReject,
  validateSync
});
//# sourceMappingURL=index.js.map
