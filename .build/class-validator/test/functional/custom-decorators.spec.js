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
var import_Validator = require("../../src/validation/Validator");
var import_register_decorator = require("../../src/register-decorator");
var import_decorators = require("../../src/decorator/decorators");
const validator = new import_Validator.Validator();
describe("decorator with inline validation", () => {
  function IsLongerThan(property, validationOptions) {
    return function(object, propertyName) {
      (0, import_register_decorator.registerDecorator)({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        name: "isLongerThan",
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
            if (relatedValue === void 0 || relatedValue === null) {
              return true;
            }
            const result = typeof value === "string" && typeof relatedValue === "string" && value.length > relatedValue.length;
            const asPromise = validationOptions && validationOptions.context && validationOptions.context.promise;
            return asPromise ? Promise.resolve(result) : result;
          }
        }
      });
    };
  }
  class MyClass {
  }
  __decorateClass([
    IsLongerThan("lastName", {
      context: { foo: "bar" },
      message: "$property must be longer then $constraint1. Given value: $value"
    })
  ], MyClass.prototype, "firstName", 2);
  class MyClassWithAsyncValidator {
  }
  __decorateClass([
    IsLongerThan("lastName", {
      context: { foo: "bar", promise: true },
      message: "$property must be longer then $constraint1. Given value: $value"
    })
  ], MyClassWithAsyncValidator.prototype, "firstName", 2);
  it("if firstName is not empty and lastLame is empty then it should succeed", () => {
    expect.assertions(1);
    const model = new MyClass();
    model.firstName = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it("if firstName is empty and lastLame is not empty then it should fail", () => {
    expect.assertions(2);
    const model = new MyClass();
    model.firstName = "";
    model.lastName = "Kim";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ isLongerThan: "firstName must be longer then lastName. Given value: " });
    });
  });
  it("if firstName is shorter then lastLame then it should fail", () => {
    expect.assertions(2);
    const model = new MyClass();
    model.firstName = "Li";
    model.lastName = "Kim";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        isLongerThan: "firstName must be longer then lastName. Given value: Li"
      });
    });
  });
  it("should include context", () => {
    expect.assertions(4);
    const model = new MyClass();
    const asyncModel = new MyClassWithAsyncValidator();
    model.firstName = asyncModel.firstName = "Paul";
    model.lastName = asyncModel.lastName = "Walker";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].contexts).toEqual({ isLongerThan: { foo: "bar" } });
      return validator.validate(asyncModel).then((errors2) => {
        expect(errors2.length).toEqual(1);
        expect(errors2[0].contexts).toHaveProperty("isLongerThan.foo", "bar");
      });
    });
  });
});
describe("decorator with default message", () => {
  function IsLonger(property, validationOptions) {
    return function(object, propertyName) {
      (0, import_register_decorator.registerDecorator)({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        name: "isLonger",
        validator: {
          validate(value, args) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = args.object[relatedPropertyName];
            if (relatedValue === void 0 || relatedValue === null)
              return true;
            return typeof value === "string" && typeof relatedValue === "string" && value.length > relatedValue.length;
          },
          defaultMessage(args) {
            return args.property + " must be longer then " + args.constraints[0];
          }
        }
      });
    };
  }
  class SecondClass {
  }
  __decorateClass([
    IsLonger("lastName")
  ], SecondClass.prototype, "firstName", 2);
  it("if firstName is not empty and lastLame is empty then it should succeed", () => {
    expect.assertions(1);
    const model = new SecondClass();
    model.firstName = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it("if firstName is empty and lastLame is not empty then it should fail", () => {
    expect.assertions(2);
    const model = new SecondClass();
    model.firstName = "";
    model.lastName = "Kim";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ isLonger: "firstName must be longer then lastName" });
    });
  });
  it("if firstName is shorter then lastLame then it should fail", () => {
    expect.assertions(2);
    const model = new SecondClass();
    model.firstName = "Li";
    model.lastName = "Kim";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ isLonger: "firstName must be longer then lastName" });
    });
  });
});
describe("decorator with separate validation constraint class", () => {
  let IsShortenThanConstraint = class {
    validate(value, args) {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = args.object[relatedPropertyName];
      if (value === null || value === void 0)
        return true;
      return typeof value === "string" && typeof relatedValue === "string" && value.length < relatedValue.length;
    }
  };
  IsShortenThanConstraint = __decorateClass([
    (0, import_decorators.ValidatorConstraint)({ name: "isShortenThan" })
  ], IsShortenThanConstraint);
  function IsShorterThan(property, validationOptions) {
    return function(object, propertyName) {
      (0, import_register_decorator.registerDecorator)({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        validator: IsShortenThanConstraint
      });
    };
  }
  class MyClass {
  }
  __decorateClass([
    IsShorterThan("firstName", {
      message: "$property must be shorter then $constraint1. Given value: $value"
    })
  ], MyClass.prototype, "lastName", 2);
  it("if firstName is not empty and lastLame is empty then it should succeed", () => {
    expect.assertions(1);
    const model = new MyClass();
    model.firstName = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it("if firstName is empty and lastLame is not empty then it should fail", () => {
    expect.assertions(2);
    const model = new MyClass();
    model.firstName = "";
    model.lastName = "Kim";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        isShortenThan: "lastName must be shorter then firstName. Given value: Kim"
      });
    });
  });
  it("if firstName is shorter then lastLame then it should fail", () => {
    expect.assertions(2);
    const model = new MyClass();
    model.firstName = "Li";
    model.lastName = "Kim";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        isShortenThan: "lastName must be shorter then firstName. Given value: Kim"
      });
    });
  });
});
//# sourceMappingURL=custom-decorators.spec.js.map
