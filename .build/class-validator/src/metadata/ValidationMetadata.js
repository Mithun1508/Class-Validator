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
var ValidationMetadata_exports = {};
__export(ValidationMetadata_exports, {
  ValidationMetadata: () => ValidationMetadata
});
module.exports = __toCommonJS(ValidationMetadata_exports);
class ValidationMetadata {
  constructor(args) {
    this.groups = [];
    this.each = false;
    this.context = void 0;
    this.type = args.type;
    this.target = args.target;
    this.propertyName = args.propertyName;
    this.constraints = args.constraints;
    this.constraintCls = args.constraintCls;
    this.validationTypeOptions = args.validationTypeOptions;
    if (args.validationOptions) {
      this.message = args.validationOptions.message;
      this.groups = args.validationOptions.groups;
      this.always = args.validationOptions.always;
      this.each = args.validationOptions.each;
      this.context = args.validationOptions.context;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationMetadata
});
//# sourceMappingURL=ValidationMetadata.js.map
