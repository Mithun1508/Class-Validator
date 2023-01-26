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
class MyClass {
}
__decorateClass([
  (0, import_decorators.Contains)("hello", {
    message: "$value is not valid. Your string must contain a hello word"
  })
], MyClass.prototype, "someProperty", 2);
describe("validateOrReject()", () => {
  let validator;
  let model;
  beforeEach(() => {
    validator = new import_Validator.Validator();
    model = new MyClass();
  });
  it("should resolve promise when no error", () => {
    expect.assertions(1);
    model.someProperty = "hello world";
    return validator.validateOrReject(model).then((args) => {
      expect(args).toBeUndefined();
    });
  });
  it("should reject promise on error", () => {
    expect.assertions(2);
    model.someProperty = "hell no world";
    return validator.validateOrReject(model).catch((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        contains: "hell no world is not valid. Your string must contain a hello word"
      });
    });
  });
});
//# sourceMappingURL=reject-validation.spec.js.map
