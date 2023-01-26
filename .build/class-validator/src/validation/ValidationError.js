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
var ValidationError_exports = {};
__export(ValidationError_exports, {
  ValidationError: () => ValidationError
});
module.exports = __toCommonJS(ValidationError_exports);
class ValidationError {
  toString(shouldDecorate = false, hasParent = false, parentPath = ``) {
    const boldStart = shouldDecorate ? `\x1B[1m` : ``;
    const boldEnd = shouldDecorate ? `\x1B[22m` : ``;
    const propConstraintFailed = (propertyName) => ` - property ${boldStart}${parentPath}${propertyName}${boldEnd} has failed the following constraints: ${boldStart}${Object.keys(
      this.constraints
    ).join(`, `)}${boldEnd} 
`;
    if (!hasParent) {
      return `An instance of ${boldStart}${this.target ? this.target.constructor.name : "an object"}${boldEnd} has failed the validation:
` + (this.constraints ? propConstraintFailed(this.property) : ``) + (this.children ? this.children.map((childError) => childError.toString(shouldDecorate, true, this.property)).join(``) : ``);
    } else {
      const formattedProperty = Number.isInteger(+this.property) ? `[${this.property}]` : `${parentPath ? `.` : ``}${this.property}`;
      if (this.constraints) {
        return propConstraintFailed(formattedProperty);
      } else {
        return this.children ? this.children.map((childError) => childError.toString(shouldDecorate, true, `${parentPath}${formattedProperty}`)).join(``) : ``;
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationError
});
//# sourceMappingURL=ValidationError.js.map
