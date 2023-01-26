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
var container_exports = {};
__export(container_exports, {
  getFromContainer: () => getFromContainer,
  useContainer: () => useContainer
});
module.exports = __toCommonJS(container_exports);
const defaultContainer = new class {
  constructor() {
    this.instances = [];
  }
  get(someClass) {
    let instance = this.instances.find((instance2) => instance2.type === someClass);
    if (!instance) {
      instance = { type: someClass, object: new someClass() };
      this.instances.push(instance);
    }
    return instance.object;
  }
}();
let userContainer;
let userContainerOptions;
function useContainer(iocContainer, options) {
  userContainer = iocContainer;
  userContainerOptions = options;
}
function getFromContainer(someClass) {
  if (userContainer) {
    try {
      const instance = userContainer.get(someClass);
      if (instance)
        return instance;
      if (!userContainerOptions || !userContainerOptions.fallback)
        return instance;
    } catch (error) {
      if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
        throw error;
    }
  }
  return defaultContainer.get(someClass);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFromContainer,
  useContainer
});
//# sourceMappingURL=container.js.map
