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
var ValidateBy_exports = {};
__export(ValidateBy_exports, {
  ValidateBy: () => ValidateBy,
  buildMessage: () => buildMessage
});
module.exports = __toCommonJS(ValidateBy_exports);
var import_register_decorator = require("../../register-decorator");
function buildMessage(impl, validationOptions) {
  return (validationArguments) => {
    const eachPrefix = validationOptions && validationOptions.each ? "each value in " : "";
    return impl(eachPrefix, validationArguments);
  };
}
function ValidateBy(options, validationOptions) {
  return function(object, propertyName) {
    (0, import_register_decorator.registerDecorator)({
      name: options.name,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: options.constraints,
      validator: options.validator
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidateBy,
  buildMessage
});
//# sourceMappingURL=ValidateBy.js.map
