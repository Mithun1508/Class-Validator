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
describe("conditional validation", () => {
  it("shouldn't validate a property when the condition is false", () => {
    expect.assertions(1);
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.ValidateIf)((o) => false),
      (0, import_decorators.IsNotEmpty)()
    ], MyClass.prototype, "title", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it("should validate a property when the condition is true", () => {
    expect.assertions(5);
    class MyClass {
      constructor() {
        this.title = "";
      }
    }
    __decorateClass([
      (0, import_decorators.ValidateIf)((o) => true),
      (0, import_decorators.IsNotEmpty)()
    ], MyClass.prototype, "title", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("title");
      expect(errors[0].constraints).toEqual({ isNotEmpty: "title should not be empty" });
      expect(errors[0].value).toEqual("");
    });
  });
  it("should pass the object being validated to the condition function", () => {
    expect.assertions(3);
    class MyClass {
      constructor() {
        this.title = "title";
      }
    }
    __decorateClass([
      (0, import_decorators.ValidateIf)((o) => {
        expect(o).toBeInstanceOf(MyClass);
        expect(o.title).toEqual("title");
        return true;
      }),
      (0, import_decorators.IsNotEmpty)()
    ], MyClass.prototype, "title", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it("should validate a property when value is empty", () => {
    expect.assertions(5);
    class MyClass {
      constructor() {
        this.title = "";
      }
    }
    __decorateClass([
      (0, import_decorators.IsOptional)(),
      (0, import_decorators.Equals)("test")
    ], MyClass.prototype, "title", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("title");
      expect(errors[0].constraints).toEqual({ equals: "title must be equal to test" });
      expect(errors[0].value).toEqual("");
    });
  });
  it("should validate a property when value is supplied", () => {
    class MyClass {
      constructor() {
        this.title = "bad_value";
      }
    }
    __decorateClass([
      (0, import_decorators.IsOptional)(),
      (0, import_decorators.Equals)("test")
    ], MyClass.prototype, "title", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("title");
      expect(errors[0].constraints).toEqual({ equals: "title must be equal to test" });
      expect(errors[0].value).toEqual("bad_value");
    });
  });
});
//# sourceMappingURL=conditional-validation.spec.js.map
