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
var Validator_exports = {};
__export(Validator_exports, {
  Validator: () => Validator
});
module.exports = __toCommonJS(Validator_exports);
var import_ValidationExecutor = require("./ValidationExecutor");
class Validator {
  validate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
    return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
  }
  async validateOrReject(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
    const errors = await this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
    if (errors.length)
      return Promise.reject(errors);
  }
  validateSync(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
    const object = typeof objectOrSchemaName === "string" ? objectOrValidationOptions : objectOrSchemaName;
    const options = typeof objectOrSchemaName === "string" ? maybeValidatorOptions : objectOrValidationOptions;
    const schema = typeof objectOrSchemaName === "string" ? objectOrSchemaName : void 0;
    const executor = new import_ValidationExecutor.ValidationExecutor(this, options);
    executor.ignoreAsyncValidations = true;
    const validationErrors = [];
    executor.execute(object, schema, validationErrors);
    return executor.stripEmptyErrors(validationErrors);
  }
  coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
    const object = typeof objectOrSchemaName === "string" ? objectOrValidationOptions : objectOrSchemaName;
    const options = typeof objectOrSchemaName === "string" ? maybeValidatorOptions : objectOrValidationOptions;
    const schema = typeof objectOrSchemaName === "string" ? objectOrSchemaName : void 0;
    const executor = new import_ValidationExecutor.ValidationExecutor(this, options);
    const validationErrors = [];
    executor.execute(object, schema, validationErrors);
    return Promise.all(executor.awaitingPromises).then(() => {
      return executor.stripEmptyErrors(validationErrors);
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Validator
});
//# sourceMappingURL=Validator.js.map
