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
var IsInstance_exports = {};
__export(IsInstance_exports, {
  IS_INSTANCE: () => IS_INSTANCE,
  IsInstance: () => IsInstance,
  isInstance: () => isInstance
});
module.exports = __toCommonJS(IsInstance_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_INSTANCE = "isInstance";
function isInstance(object, targetTypeConstructor) {
  return targetTypeConstructor && typeof targetTypeConstructor === "function" && object instanceof targetTypeConstructor;
}
function IsInstance(targetType, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_INSTANCE,
      constraints: [targetType],
      validator: {
        validate: (value, args) => isInstance(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix, args) => {
          if (args.constraints[0]) {
            return eachPrefix + `$property must be an instance of ${args.constraints[0].name}`;
          } else {
            return eachPrefix + `${IS_INSTANCE} decorator expects and object as value, but got falsy value.`;
          }
        }, validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_INSTANCE,
  IsInstance,
  isInstance
});
//# sourceMappingURL=IsInstance.js.map
