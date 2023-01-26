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
var Matches_exports = {};
__export(Matches_exports, {
  MATCHES: () => MATCHES,
  Matches: () => Matches,
  matches: () => matches
});
module.exports = __toCommonJS(Matches_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_matches = __toESM(require("validator/lib/matches"));
const MATCHES = "matches";
function matches(value, pattern, modifiers) {
  return typeof value === "string" && (0, import_matches.default)(value, pattern, modifiers);
}
function Matches(pattern, modifiersOrAnnotationOptions, validationOptions) {
  let modifiers;
  if (modifiersOrAnnotationOptions && modifiersOrAnnotationOptions instanceof Object && !validationOptions) {
    validationOptions = modifiersOrAnnotationOptions;
  } else {
    modifiers = modifiersOrAnnotationOptions;
  }
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: MATCHES,
      constraints: [pattern, modifiers],
      validator: {
        validate: (value, args) => matches(value, args.constraints[0], args.constraints[1]),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix, args) => eachPrefix + "$property must match $constraint1 regular expression",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MATCHES,
  Matches,
  matches
});
//# sourceMappingURL=Matches.js.map
