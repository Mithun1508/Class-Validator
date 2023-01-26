"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var import_decorators = require("../../src/decorator/decorators");
var import_Validator = require("../../src/validation/Validator");
var import_src = require("../../src");
const validator = new import_Validator.Validator();
describe("whitelist validation", () => {
  it("should strip non whitelisted properties, but leave whitelisted untouched", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.IsDefined)()
    ], MyClass.prototype, "title", 2);
    __decorateClass([
      (0, import_decorators.Min)(0)
    ], MyClass.prototype, "views", 2);
    const model = new MyClass();
    model.title = "hello";
    model.views = 56;
    model.unallowedProperty = 42;
    return validator.validate(model, { whitelist: true }).then((errors) => {
      expect(errors.length).toEqual(0);
      expect(model.unallowedProperty).toBeUndefined();
      expect(model.title).toEqual("hello");
      expect(model.views).toEqual(56);
    });
  });
  it("should be able to whitelist with @Allow", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Allow)()
    ], MyClass.prototype, "views", 2);
    const model = new MyClass();
    model.views = 420;
    model.unallowedProperty = "non-whitelisted";
    return validator.validate(model, { whitelist: true }).then((errors) => {
      expect(errors.length).toEqual(0);
      expect(model.unallowedProperty).toBeUndefined();
      expect(model.views).toEqual(420);
    });
  });
  it("should throw an error when forbidNonWhitelisted flag is set", () => {
    class MyClass {
    }
    const model = new MyClass();
    model.unallowedProperty = "non-whitelisted";
    return validator.validate(model, { whitelist: true, forbidNonWhitelisted: true }).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("unallowedProperty");
      expect(errors[0].constraints).toHaveProperty(import_src.ValidationTypes.WHITELIST);
      expect(() => errors[0].toString()).not.toThrowError();
    });
  });
});
//# sourceMappingURL=whitelist-validation.spec.js.map
