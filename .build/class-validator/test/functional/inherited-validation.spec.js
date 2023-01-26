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
const validator = new import_Validator.Validator();
describe("inherited validation", () => {
  it("should validate inherited properties", () => {
    expect.assertions(9);
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello")
    ], MyClass.prototype, "title", 2);
    class MySubClass extends MyClass {
    }
    __decorateClass([
      (0, import_decorators.MinLength)(5)
    ], MySubClass.prototype, "name", 2);
    const model = new MySubClass();
    model.title = "helo world";
    model.name = "my";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(2);
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("name");
      expect(errors[0].constraints).toEqual({ minLength: "name must be longer than or equal to 5 characters" });
      expect(errors[0].value).toEqual("my");
      expect(errors[1].target).toEqual(model);
      expect(errors[1].property).toEqual("title");
      expect(errors[1].constraints).toEqual({ contains: "title must contain a hello string" });
      expect(errors[1].value).toEqual("helo world");
    });
  });
});
//# sourceMappingURL=inherited-validation.spec.js.map
