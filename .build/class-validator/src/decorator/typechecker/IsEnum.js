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
var IsEnum_exports = {};
__export(IsEnum_exports, {
  IS_ENUM: () => IS_ENUM,
  IsEnum: () => IsEnum,
  isEnum: () => isEnum
});
module.exports = __toCommonJS(IsEnum_exports);
var import_ValidateBy = require("../common/ValidateBy");
const IS_ENUM = "isEnum";
function isEnum(value, entity) {
  const enumValues = Object.keys(entity).map((k) => entity[k]);
  return enumValues.indexOf(value) >= 0;
}
function IsEnum(entity, validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_ENUM,
      constraints: [entity],
      validator: {
        validate: (value, args) => isEnum(value, args.constraints[0]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid enum value",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_ENUM,
  IsEnum,
  isEnum
});
//# sourceMappingURL=IsEnum.js.map
