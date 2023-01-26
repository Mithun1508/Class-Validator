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
var ValidationUtils_exports = {};
__export(ValidationUtils_exports, {
  ValidationUtils: () => ValidationUtils,
  constraintToString: () => constraintToString
});
module.exports = __toCommonJS(ValidationUtils_exports);
function constraintToString(constraint) {
  if (Array.isArray(constraint)) {
    return constraint.join(", ");
  }
  return `${constraint}`;
}
class ValidationUtils {
  static replaceMessageSpecialTokens(message, validationArguments) {
    let messageString;
    if (message instanceof Function) {
      messageString = message(validationArguments);
    } else if (typeof message === "string") {
      messageString = message;
    }
    if (messageString && validationArguments.constraints instanceof Array) {
      validationArguments.constraints.forEach((constraint, index) => {
        messageString = messageString.replace(
          new RegExp(`\\$constraint${index + 1}`, "g"),
          constraintToString(constraint)
        );
      });
    }
    if (messageString && validationArguments.value !== void 0 && validationArguments.value !== null && typeof validationArguments.value === "string")
      messageString = messageString.replace(/\$value/g, validationArguments.value);
    if (messageString)
      messageString = messageString.replace(/\$property/g, validationArguments.property);
    if (messageString)
      messageString = messageString.replace(/\$target/g, validationArguments.targetName);
    return messageString;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationUtils,
  constraintToString
});
//# sourceMappingURL=ValidationUtils.js.map
