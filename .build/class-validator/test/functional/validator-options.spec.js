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
describe("validator options", () => {
  it("should not return target in validation error if validationError: { target: false } is set", () => {
    class MyClass {
      constructor() {
        this.title = "";
      }
    }
    __decorateClass([
      (0, import_decorators.IsNotEmpty)()
    ], MyClass.prototype, "title", 2);
    const model = new MyClass();
    model.title = "";
    return validator.validate(model, { skipMissingProperties: true, validationError: { target: false } }).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toBeUndefined();
      expect(errors[0].property).toEqual("title");
      expect(errors[0].constraints).toEqual({ isNotEmpty: "title should not be empty" });
      expect(errors[0].value).toEqual("");
    });
  });
  it("should returns error on unknown objects if forbidUnknownValues is true", function() {
    const anonymousObject = { badKey: "This should not pass." };
    return validator.validate(anonymousObject, { forbidUnknownValues: true }).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toEqual(anonymousObject);
      expect(errors[0].property).toEqual(void 0);
      expect(errors[0].value).toEqual(void 0);
      expect(errors[0].children).toBeInstanceOf(Array);
      expect(errors[0].constraints).toEqual({ unknownValue: "an unknown value was passed to the validate function" });
    });
  });
  it("should return no error on unknown objects if forbidUnknownValues is false", function() {
    const anonymousObject = { badKey: "This should not pass." };
    return validator.validate(anonymousObject, { forbidUnknownValues: false }).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
});
//# sourceMappingURL=validator-options.spec.js.map
