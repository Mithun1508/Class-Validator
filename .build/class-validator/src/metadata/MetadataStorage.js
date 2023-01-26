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
var MetadataStorage_exports = {};
__export(MetadataStorage_exports, {
  MetadataStorage: () => MetadataStorage,
  getMetadataStorage: () => getMetadataStorage
});
module.exports = __toCommonJS(MetadataStorage_exports);
var import_ValidationSchemaToMetadataTransformer = require("../validation-schema/ValidationSchemaToMetadataTransformer");
var import_utils = require("../utils");
class MetadataStorage {
  constructor() {
    this.validationMetadatas = [];
    this.constraintMetadatas = [];
  }
  get hasValidationMetaData() {
    return !!this.validationMetadatas.length;
  }
  addValidationSchema(schema) {
    const validationMetadatas = new import_ValidationSchemaToMetadataTransformer.ValidationSchemaToMetadataTransformer().transform(schema);
    validationMetadatas.forEach((validationMetadata) => this.addValidationMetadata(validationMetadata));
  }
  addValidationMetadata(metadata) {
    this.validationMetadatas.push(metadata);
  }
  addConstraintMetadata(metadata) {
    this.constraintMetadatas.push(metadata);
  }
  groupByPropertyName(metadata) {
    const grouped = {};
    metadata.forEach((metadata2) => {
      if (!grouped[metadata2.propertyName])
        grouped[metadata2.propertyName] = [];
      grouped[metadata2.propertyName].push(metadata2);
    });
    return grouped;
  }
  getTargetValidationMetadatas(targetConstructor, targetSchema, always, strictGroups, groups) {
    const includeMetadataBecauseOfAlwaysOption = (metadata) => {
      if (typeof metadata.always !== "undefined")
        return metadata.always;
      if (metadata.groups && metadata.groups.length)
        return false;
      return always;
    };
    const excludeMetadataBecauseOfStrictGroupsOption = (metadata) => {
      if (strictGroups) {
        if (!groups || !groups.length) {
          if (metadata.groups && metadata.groups.length)
            return true;
        }
      }
      return false;
    };
    const originalMetadatas = this.validationMetadatas.filter((metadata) => {
      if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
        return false;
      if (includeMetadataBecauseOfAlwaysOption(metadata))
        return true;
      if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
        return false;
      if (groups && groups.length > 0)
        return metadata.groups && !!metadata.groups.find((group) => groups.indexOf(group) !== -1);
      return true;
    });
    const inheritedMetadatas = this.validationMetadatas.filter((metadata) => {
      if (typeof metadata.target === "string")
        return false;
      if (metadata.target === targetConstructor)
        return false;
      if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
        return false;
      if (includeMetadataBecauseOfAlwaysOption(metadata))
        return true;
      if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
        return false;
      if (groups && groups.length > 0)
        return metadata.groups && !!metadata.groups.find((group) => groups.indexOf(group) !== -1);
      return true;
    });
    const uniqueInheritedMetadatas = inheritedMetadatas.filter((inheritedMetadata) => {
      return !originalMetadatas.find((originalMetadata) => {
        return originalMetadata.propertyName === inheritedMetadata.propertyName && originalMetadata.type === inheritedMetadata.type;
      });
    });
    return originalMetadatas.concat(uniqueInheritedMetadatas);
  }
  getTargetValidatorConstraints(target) {
    return this.constraintMetadatas.filter((metadata) => metadata.target === target);
  }
}
function getMetadataStorage() {
  const global = (0, import_utils.getGlobal)();
  if (!global.classValidatorMetadataStorage) {
    global.classValidatorMetadataStorage = new MetadataStorage();
  }
  return global.classValidatorMetadataStorage;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MetadataStorage,
  getMetadataStorage
});
//# sourceMappingURL=MetadataStorage.js.map
