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
var ValidationExecutor_exports = {};
__export(ValidationExecutor_exports, {
  ValidationExecutor: () => ValidationExecutor
});
module.exports = __toCommonJS(ValidationExecutor_exports);
var import_ValidationError = require("./ValidationError");
var import_ValidationTypes = require("./ValidationTypes");
var import_ValidationUtils = require("./ValidationUtils");
var import_utils = require("../utils");
var import_MetadataStorage = require("../metadata/MetadataStorage");
class ValidationExecutor {
  constructor(validator, validatorOptions) {
    this.validator = validator;
    this.validatorOptions = validatorOptions;
    this.awaitingPromises = [];
    this.ignoreAsyncValidations = false;
    this.metadataStorage = (0, import_MetadataStorage.getMetadataStorage)();
  }
  execute(object, targetSchema, validationErrors) {
    var _a;
    if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) == null ? void 0 : _a.enableDebugMessages) === true) {
      console.warn(
        `No metadata found. There is more than once class-validator version installed probably. You need to flatten your dependencies.`
      );
    }
    const groups = this.validatorOptions ? this.validatorOptions.groups : void 0;
    const strictGroups = this.validatorOptions && this.validatorOptions.strictGroups || false;
    const always = this.validatorOptions && this.validatorOptions.always || false;
    const targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(
      object.constructor,
      targetSchema,
      always,
      strictGroups,
      groups
    );
    const groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
    if (this.validatorOptions && this.validatorOptions.forbidUnknownValues && !targetMetadatas.length) {
      const validationError = new import_ValidationError.ValidationError();
      if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === true)
        validationError.target = object;
      validationError.value = void 0;
      validationError.property = void 0;
      validationError.children = [];
      validationError.constraints = { unknownValue: "an unknown value was passed to the validate function" };
      validationErrors.push(validationError);
      return;
    }
    if (this.validatorOptions && this.validatorOptions.whitelist)
      this.whitelist(object, groupedMetadatas, validationErrors);
    Object.keys(groupedMetadatas).forEach((propertyName) => {
      const value = object[propertyName];
      const definedMetadatas = groupedMetadatas[propertyName].filter(
        (metadata) => metadata.type === import_ValidationTypes.ValidationTypes.IS_DEFINED
      );
      const metadatas = groupedMetadatas[propertyName].filter(
        (metadata) => metadata.type !== import_ValidationTypes.ValidationTypes.IS_DEFINED && metadata.type !== import_ValidationTypes.ValidationTypes.WHITELIST
      );
      if (value instanceof Promise && metadatas.find((metadata) => metadata.type === import_ValidationTypes.ValidationTypes.PROMISE_VALIDATION)) {
        this.awaitingPromises.push(
          value.then((resolvedValue) => {
            this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
          })
        );
      } else {
        this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
      }
    });
  }
  whitelist(object, groupedMetadatas, validationErrors) {
    const notAllowedProperties = [];
    Object.keys(object).forEach((propertyName) => {
      if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
        notAllowedProperties.push(propertyName);
    });
    if (notAllowedProperties.length > 0) {
      if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
        notAllowedProperties.forEach((property) => {
          const validationError = this.generateValidationError(object, object[property], property);
          validationError.constraints = { [import_ValidationTypes.ValidationTypes.WHITELIST]: `property ${property} should not exist` };
          validationError.children = void 0;
          validationErrors.push(validationError);
        });
      } else {
        notAllowedProperties.forEach((property) => delete object[property]);
      }
    }
  }
  stripEmptyErrors(errors) {
    return errors.filter((error) => {
      if (error.children) {
        error.children = this.stripEmptyErrors(error.children);
      }
      if (Object.keys(error.constraints).length === 0) {
        if (error.children.length === 0) {
          return false;
        } else {
          delete error.constraints;
        }
      }
      return true;
    });
  }
  performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
    const customValidationMetadatas = metadatas.filter((metadata) => metadata.type === import_ValidationTypes.ValidationTypes.CUSTOM_VALIDATION);
    const nestedValidationMetadatas = metadatas.filter((metadata) => metadata.type === import_ValidationTypes.ValidationTypes.NESTED_VALIDATION);
    const conditionalValidationMetadatas = metadatas.filter(
      (metadata) => metadata.type === import_ValidationTypes.ValidationTypes.CONDITIONAL_VALIDATION
    );
    const validationError = this.generateValidationError(object, value, propertyName);
    validationErrors.push(validationError);
    const canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
    if (!canValidate) {
      return;
    }
    this.customValidations(object, value, definedMetadatas, validationError);
    this.mapContexts(object, value, definedMetadatas, validationError);
    if (value === void 0 && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
      return;
    }
    if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
      return;
    }
    if ((value === null || value === void 0) && this.validatorOptions && this.validatorOptions.skipMissingProperties === true) {
      return;
    }
    this.customValidations(object, value, customValidationMetadatas, validationError);
    this.nestedValidations(value, nestedValidationMetadatas, validationError.children);
    this.mapContexts(object, value, metadatas, validationError);
    this.mapContexts(object, value, customValidationMetadatas, validationError);
  }
  generateValidationError(object, value, propertyName) {
    const validationError = new import_ValidationError.ValidationError();
    if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === true)
      validationError.target = object;
    if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.value === void 0 || this.validatorOptions.validationError.value === true)
      validationError.value = value;
    validationError.property = propertyName;
    validationError.children = [];
    validationError.constraints = {};
    return validationError;
  }
  conditionalValidations(object, value, metadatas) {
    return metadatas.map((metadata) => metadata.constraints[0](object, value)).reduce((resultA, resultB) => resultA && resultB, true);
  }
  customValidations(object, value, metadatas, error) {
    metadatas.forEach((metadata) => {
      this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach((customConstraintMetadata) => {
        if (customConstraintMetadata.async && this.ignoreAsyncValidations)
          return;
        if (this.validatorOptions && this.validatorOptions.stopAtFirstError && Object.keys(error.constraints || {}).length > 0)
          return;
        const validationArguments = {
          targetName: object.constructor ? object.constructor.name : void 0,
          property: metadata.propertyName,
          object,
          value,
          constraints: metadata.constraints
        };
        if (!metadata.each || !(value instanceof Array || value instanceof Set || value instanceof Map)) {
          const validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
          if ((0, import_utils.isPromise)(validatedValue)) {
            const promise = validatedValue.then((isValid) => {
              if (!isValid) {
                const [type, message] = this.createValidationError(object, value, metadata, customConstraintMetadata);
                error.constraints[type] = message;
                if (metadata.context) {
                  if (!error.contexts) {
                    error.contexts = {};
                  }
                  error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                }
              }
            });
            this.awaitingPromises.push(promise);
          } else {
            if (!validatedValue) {
              const [type, message] = this.createValidationError(object, value, metadata, customConstraintMetadata);
              error.constraints[type] = message;
            }
          }
          return;
        }
        const arrayValue = (0, import_utils.convertToArray)(value);
        const validatedSubValues = arrayValue.map(
          (subValue) => customConstraintMetadata.instance.validate(subValue, validationArguments)
        );
        const validationIsAsync = validatedSubValues.some(
          (validatedSubValue) => (0, import_utils.isPromise)(validatedSubValue)
        );
        if (validationIsAsync) {
          const asyncValidatedSubValues = validatedSubValues.map(
            (validatedSubValue) => (0, import_utils.isPromise)(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue)
          );
          const asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(
            (flatValidatedValues) => {
              const validationResult2 = flatValidatedValues.every((isValid) => isValid);
              if (!validationResult2) {
                const [type, message] = this.createValidationError(object, value, metadata, customConstraintMetadata);
                error.constraints[type] = message;
                if (metadata.context) {
                  if (!error.contexts) {
                    error.contexts = {};
                  }
                  error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                }
              }
            }
          );
          this.awaitingPromises.push(asyncValidationIsFinishedPromise);
          return;
        }
        const validationResult = validatedSubValues.every((isValid) => isValid);
        if (!validationResult) {
          const [type, message] = this.createValidationError(object, value, metadata, customConstraintMetadata);
          error.constraints[type] = message;
        }
      });
    });
  }
  nestedValidations(value, metadatas, errors) {
    if (value === void 0) {
      return;
    }
    metadatas.forEach((metadata) => {
      if (metadata.type !== import_ValidationTypes.ValidationTypes.NESTED_VALIDATION && metadata.type !== import_ValidationTypes.ValidationTypes.PROMISE_VALIDATION) {
        return;
      }
      if (value instanceof Array || value instanceof Set || value instanceof Map) {
        const arrayLikeValue = value instanceof Set ? Array.from(value) : value;
        arrayLikeValue.forEach((subValue, index) => {
          this.performValidations(value, subValue, index.toString(), [], metadatas, errors);
        });
      } else if (value instanceof Object) {
        const targetSchema = typeof metadata.target === "string" ? metadata.target : metadata.target.name;
        this.execute(value, targetSchema, errors);
      } else {
        const error = new import_ValidationError.ValidationError();
        error.value = value;
        error.property = metadata.propertyName;
        error.target = metadata.target;
        const [type, message] = this.createValidationError(metadata.target, value, metadata);
        error.constraints = {
          [type]: message
        };
        errors.push(error);
      }
    });
  }
  mapContexts(object, value, metadatas, error) {
    return metadatas.forEach((metadata) => {
      if (metadata.context) {
        let customConstraint;
        if (metadata.type === import_ValidationTypes.ValidationTypes.CUSTOM_VALIDATION) {
          const customConstraints = this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
          customConstraint = customConstraints[0];
        }
        const type = this.getConstraintType(metadata, customConstraint);
        if (error.constraints[type]) {
          if (!error.contexts) {
            error.contexts = {};
          }
          error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
        }
      }
    });
  }
  createValidationError(object, value, metadata, customValidatorMetadata) {
    const targetName = object.constructor ? object.constructor.name : void 0;
    const type = this.getConstraintType(metadata, customValidatorMetadata);
    const validationArguments = {
      targetName,
      property: metadata.propertyName,
      object,
      value,
      constraints: metadata.constraints
    };
    let message = metadata.message || "";
    if (!metadata.message && (!this.validatorOptions || this.validatorOptions && !this.validatorOptions.dismissDefaultMessages)) {
      if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
        message = customValidatorMetadata.instance.defaultMessage(validationArguments);
      }
    }
    const messageString = import_ValidationUtils.ValidationUtils.replaceMessageSpecialTokens(message, validationArguments);
    return [type, messageString];
  }
  getConstraintType(metadata, customValidatorMetadata) {
    const type = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
    return type;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationExecutor
});
//# sourceMappingURL=ValidationExecutor.js.map
