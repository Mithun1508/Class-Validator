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
describe("sync validation should ignore async validation constraints", () => {
  let IsShortenThanConstraint = class {
    validate(value, args) {
      return Promise.resolve(false);
    }
  };
  IsShortenThanConstraint = __decorateClass([
    (0, import_decorators.ValidatorConstraint)({ name: "isShortenThan", async: true })
  ], IsShortenThanConstraint);
  function IsLonger(property, validationOptions) {
    return function(object, propertyName) {
      (0, import_register_decorator.registerDecorator)({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        async: true,
        name: "isLonger",
        validator: {
          validate(value, args) {
            return Promise.resolve(false);
          }
        }
      });
    };
  }
  class SecondClass {
    constructor() {
      this.alwaysWithValue = "this field always has a value";
    }
  }
  __decorateClass([
    IsLonger("lastName")
  ], SecondClass.prototype, "firstName", 2);
  __decorateClass([
    (0, import_decorators.Validate)(IsShortenThanConstraint)
  ], SecondClass.prototype, "lastName", 2);
  __decorateClass([
    (0, import_decorators.IsNotEmpty)({ message: "name should not be empty" })
  ], SecondClass.prototype, "name", 2);
  __decorateClass([
    (0, import_decorators.IsNotEmpty)()
  ], SecondClass.prototype, "alwaysWithValue", 2);
  it("should ignore async validations and validate only sync validation types", () => {
    expect.assertions(1);
    const model = new SecondClass();
    model.firstName = "such validation may lead";
    model.firstName = "to recursion";
    model.name = "Umed";
    const errors = validator.validateSync(model);
    expect(errors.length).toEqual(0);
  });
  it("should ignore async validations and validate only sync validation types", () => {
    expect.assertions(2);
    const model = new SecondClass();
    model.firstName = "such validation may lead";
    model.firstName = "to recursion";
    model.name = "";
    const errors = validator.validateSync(model);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual({ isNotEmpty: "name should not be empty" });
  });
});
//# sourceMappingURL=sync-validation.spec.js.map
