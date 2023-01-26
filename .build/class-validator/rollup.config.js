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
var rollup_config_exports = {};
__export(rollup_config_exports, {
  default: () => rollup_config_default
});
module.exports = __toCommonJS(rollup_config_exports);
var import_plugin_node_resolve = require("@rollup/plugin-node-resolve");
var import_plugin_commonjs = __toESM(require("@rollup/plugin-commonjs"));
var import_rollup_plugin_terser = require("rollup-plugin-terser");
var rollup_config_default = {
  input: "build/esm5/index.js",
  output: [
    {
      name: "ClassValidator",
      format: "umd",
      file: "build/bundles/class-validator.umd.js",
      sourcemap: true
    },
    {
      name: "ClassValidator",
      format: "umd",
      file: "build/bundles/class-validator.umd.min.js",
      sourcemap: true,
      plugins: [(0, import_rollup_plugin_terser.terser)()]
    }
  ],
  plugins: [(0, import_plugin_commonjs.default)(), (0, import_plugin_node_resolve.nodeResolve)()]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=rollup.config.js.map
