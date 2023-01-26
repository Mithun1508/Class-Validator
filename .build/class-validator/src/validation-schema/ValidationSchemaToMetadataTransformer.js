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
var ValidationSchemaToMetadataTransformer_exports = {};
__export(ValidationSchemaToMetadataTransformer_exports, {
  ValidationSchemaToMetadataTransformer: () => ValidationSchemaToMetadataTransformer
});
module.exports = __toCommonJS(ValidationSchemaToMetadataTransformer_exports);
var import_ValidationMetadata = require("../metadata/ValidationMetadata");
class ValidationSchemaToMetadataTransformer {
  transform(schema) {
    const metadatas = [];
    Object.keys(schema.properties).forEach((property) => {
      schema.properties[property].forEach((validation) => {
        const validationOptions = {
          message: validation.message,
          groups: validation.groups,
          always: validation.always,
          each: validation.each
        };
        const args = {
          type: validation.type,
          target: schema.name,
          propertyName: property,
          constraints: validation.constraints,
          validationTypeOptions: validation.options,
          validationOptions
        };
        metadatas.push(new import_ValidationMetadata.ValidationMetadata(args));
      });
    });
    return metadatas;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationSchemaToMetadataTransformer
});
//# sourceMappingURL=ValidationSchemaToMetadataTransformer.js.map
