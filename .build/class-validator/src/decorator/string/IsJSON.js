"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var IsJSON_exports = {};
__export(IsJSON_exports, {
  IS_JSON: () => IS_JSON,
  IsJSON: () => IsJSON,
  isJSON: () => isJSON
});
module.exports = __toCommonJS(IsJSON_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_isJSON = __toESM(require("validator/lib/isJSON"));
const IS_JSON = "isJson";
function isJSON(value) {
  return typeof value === "string" && (0, import_isJSON.default)(value);
}
function IsJSON(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_JSON,
      validator: {
        validate: (value, args) => isJSON(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "$property must be a json string", validationOptions)
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_JSON,
  IsJSON,
  isJSON
});
//# sourceMappingURL=IsJSON.js.map
