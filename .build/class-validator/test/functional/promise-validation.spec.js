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
var import_ValidationTypes = require("../../src/validation/ValidationTypes");
const validator = new import_Validator.Validator();
describe("promise validation", () => {
  it("should not validate missing nested objects", () => {
    expect.assertions(4);
    class MySubClass {
    }
    __decorateClass([
      (0, import_decorators.MinLength)(5)
    ], MySubClass.prototype, "name", 2);
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello")
    ], MyClass.prototype, "title", 2);
    __decorateClass([
      (0, import_decorators.ValidatePromise)(),
      (0, import_decorators.ValidateNested)(),
      (0, import_decorators.IsDefined)()
    ], MyClass.prototype, "mySubClass", 2);
    const model = new MyClass();
    model.title = "helo";
    return validator.validate(model).then((errors) => {
      expect(errors[1].target).toEqual(model);
      expect(errors[1].value).toBeUndefined();
      expect(errors[1].property).toEqual("mySubClass");
      expect(errors[1].constraints).toEqual({ isDefined: "mySubClass should not be null or undefined" });
    });
  });
  it("should validate nested objects", () => {
    expect.assertions(24);
    class MySubClass {
    }
    __decorateClass([
      (0, import_decorators.MinLength)(5)
    ], MySubClass.prototype, "name", 2);
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello")
    ], MyClass.prototype, "title", 2);
    __decorateClass([
      (0, import_decorators.ValidatePromise)(),
      (0, import_decorators.ValidateNested)()
    ], MyClass.prototype, "mySubClass", 2);
    __decorateClass([
      (0, import_decorators.ValidatePromise)(),
      (0, import_decorators.ValidateNested)()
    ], MyClass.prototype, "mySubClasses", 2);
    const model = new MyClass();
    model.title = "helo world";
    const mySubClass = new MySubClass();
    mySubClass.name = "my";
    model.mySubClass = Promise.resolve(mySubClass);
    const mySubClasses = [new MySubClass(), new MySubClass()];
    mySubClasses[0].name = "my";
    mySubClasses[1].name = "not-short";
    model.mySubClasses = Promise.resolve(mySubClasses);
    return validator.validate(model).then((errors) => {
      return Promise.all([model.mySubClass, model.mySubClasses]).then(([modelMySubClass, modelMySubClasses]) => {
        expect(errors.length).toEqual(3);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("title");
        expect(errors[0].constraints).toEqual({ contains: "title must contain a hello string" });
        expect(errors[0].value).toEqual("helo world");
        expect(errors[1].target).toEqual(model);
        expect(errors[1].property).toEqual("mySubClass");
        expect(errors[1].value).toEqual(modelMySubClass);
        expect(errors[1].constraints).toBeUndefined();
        const subError1 = errors[1].children[0];
        expect(subError1.target).toEqual(modelMySubClass);
        expect(subError1.property).toEqual("name");
        expect(subError1.constraints).toEqual({ minLength: "name must be longer than or equal to 5 characters" });
        expect(subError1.value).toEqual("my");
        expect(errors[2].target).toEqual(model);
        expect(errors[2].property).toEqual("mySubClasses");
        expect(errors[2].value).toEqual(modelMySubClasses);
        expect(errors[2].constraints).toBeUndefined();
        const subError2 = errors[2].children[0];
        expect(subError2.target).toEqual(modelMySubClasses);
        expect(subError2.value).toEqual(modelMySubClasses[0]);
        expect(subError2.property).toEqual("0");
        const subSubError = subError2.children[0];
        expect(subSubError.target).toEqual(modelMySubClasses[0]);
        expect(subSubError.property).toEqual("name");
        expect(subSubError.constraints).toEqual({ minLength: "name must be longer than or equal to 5 characters" });
        expect(subSubError.value).toEqual("my");
      });
    });
  });
  it("should validate when nested is not object", () => {
    expect.assertions(4);
    class MySubClass {
    }
    __decorateClass([
      (0, import_decorators.MinLength)(5)
    ], MySubClass.prototype, "name", 2);
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.ValidatePromise)(),
      (0, import_decorators.ValidateNested)()
    ], MyClass.prototype, "mySubClass", 2);
    const model = new MyClass();
    model.mySubClass = "invalidnested object";
    return validator.validate(model).then((errors) => {
      expect(errors[0].target).toEqual(model);
      expect(errors[0].property).toEqual("mySubClass");
      expect(errors[0].children.length).toEqual(1);
      const subError = errors[0].children[0];
      expect(subError.constraints).toEqual({
        [import_ValidationTypes.ValidationTypes.NESTED_VALIDATION]: "nested property mySubClass must be either object or array"
      });
    });
  });
  it("should validate array promise", () => {
    expect.assertions(5);
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.ValidatePromise)(),
      (0, import_decorators.MinLength)(2)
    ], MyClass.prototype, "arrProperty", 2);
    const model = new MyClass();
    model.arrProperty = Promise.resolve(["one"]);
    return validator.validate(model).then((errors) => {
      return Promise.all([model.arrProperty]).then(([modelArrProperty]) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("arrProperty");
        expect(errors[0].constraints).toEqual({
          minLength: "arrProperty must be longer than or equal to 2 characters"
        });
        expect(errors[0].value).toEqual(modelArrProperty);
      });
    });
  });
});
//# sourceMappingURL=promise-validation.spec.js.map
