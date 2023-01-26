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
var IsMilitaryTime_exports = {};
__export(IsMilitaryTime_exports, {
  IS_MILITARY_TIME: () => IS_MILITARY_TIME,
  IsMilitaryTime: () => IsMilitaryTime,
  isMilitaryTime: () => isMilitaryTime
});
module.exports = __toCommonJS(IsMilitaryTime_exports);
var import_ValidateBy = require("../common/ValidateBy");
var import_matches = __toESM(require("validator/lib/matches"));
const IS_MILITARY_TIME = "isMilitaryTime";
function isMilitaryTime(value) {
  const militaryTimeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
  return typeof value === "string" && (0, import_matches.default)(value, militaryTimeRegex);
}
function IsMilitaryTime(validationOptions) {
  return (0, import_ValidateBy.ValidateBy)(
    {
      name: IS_MILITARY_TIME,
      validator: {
        validate: (value, args) => isMilitaryTime(value),
        defaultMessage: (0, import_ValidateBy.buildMessage)(
          (eachPrefix) => eachPrefix + "$property must be a valid representation of military time in the format HH:MM",
          validationOptions
        )
      }
    },
    validationOptions
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IS_MILITARY_TIME,
  IsMilitaryTime,
  isMilitaryTime
});
//# sourceMappingURL=IsMilitaryTime.js.map
