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
describe("ValidationError", () => {
  it("should correctly log error message without ANSI escape codes", async () => {
    class NestedClass {
      constructor(url, name, insideNested) {
        this.url = url;
        this.name = name;
        this.insideNested = insideNested;
      }
    }
    __decorateClass([
      (0, import_decorators.IsString)()
    ], NestedClass.prototype, "name", 2);
    __decorateClass([
      (0, import_decorators.IsUrl)()
    ], NestedClass.prototype, "url", 2);
    __decorateClass([
      (0, import_decorators.IsOptional)(),
      (0, import_decorators.ValidateNested)()
    ], NestedClass.prototype, "insideNested", 2);
    class RootClass {
      constructor() {
        this.title = 5;
        this.nestedObj = new NestedClass("invalid-url", 5, new NestedClass("invalid-url", 5));
        this.nestedArr = [new NestedClass("invalid-url", 5), new NestedClass("invalid-url", 5)];
      }
    }
    __decorateClass([
      (0, import_decorators.IsString)(),
      (0, import_decorators.MinLength)(15)
    ], RootClass.prototype, "title", 2);
    __decorateClass([
      (0, import_decorators.ValidateNested)()
    ], RootClass.prototype, "nestedObj", 2);
    __decorateClass([
      (0, import_decorators.ValidateNested)({ each: true })
    ], RootClass.prototype, "nestedArr", 2);
    const validationErrors = await validator.validate(new RootClass());
    expect(validationErrors[0].toString()).toEqual(
      "An instance of RootClass has failed the validation:\n - property title has failed the following constraints: minLength, isString \n"
    );
    expect(validationErrors[1].toString()).toEqual(
      "An instance of RootClass has failed the validation:\n - property nestedObj.name has failed the following constraints: isString \n - property nestedObj.url has failed the following constraints: isUrl \n - property nestedObj.insideNested.name has failed the following constraints: isString \n - property nestedObj.insideNested.url has failed the following constraints: isUrl \n"
    );
    expect(validationErrors[2].toString()).toEqual(
      "An instance of RootClass has failed the validation:\n - property nestedArr[0].name has failed the following constraints: isString \n - property nestedArr[0].url has failed the following constraints: isUrl \n - property nestedArr[1].name has failed the following constraints: isString \n - property nestedArr[1].url has failed the following constraints: isUrl \n"
    );
  });
});
//# sourceMappingURL=validation-error.spec.js.map
