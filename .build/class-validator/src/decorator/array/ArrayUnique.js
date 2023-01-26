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
var ArrayUnique_exports = {};
__export(ArrayUnique_exports, {
  ARRAY_UNIQUE: () => ARRAY_UNIQUE,
  ArrayUnique: () => ArrayUnique,
  arrayUnique: () => arrayUnique
});
module.exports = __toCommonJS(ArrayUnique_exports);
var import_ValidateBy = require("../common/ValidateBy");
const ARRAY_UNIQUE = "arrayUnique";
function arrayUnique(array, identifier) {
  if (!(array instanceof Array))
    return false;
  if (identifier) {
    array = array.map((o) => o != null ? identifier(o) : o);
  }
  const uniqueItems = array.filter((a, b, c) => c.indexOf(a) === b);
  return array.length === uniqueItems.length;
}
function ArrayUnique(identifierOrOptions, validationOptions) {
  const identifier = typeof identifierOrOptions === "function" ? identifierOrOptions : void 0;
  const options = typeof identifierOrOptions !== "function" ? identifierOrOptions : validationOptions;
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: ARRAY_UNIQUE,
      validator: {
        validate: (value, args) => arrayUnique(value, identifier),
        defaultMessage: (0, import_ValidateBy.buildMessage)((eachPrefix) => eachPrefix + "All $property's elements must be unique", options)
      }
    },
    options
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ARRAY_UNIQUE,
  ArrayUnique,
  arrayUnique
});
//# sourceMappingURL=ArrayUnique.js.map
