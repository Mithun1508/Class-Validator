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
describe("message", () => {
  it("should contain a custom message", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "String is not valid. You string must contain a hello word"
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ contains: "String is not valid. You string must contain a hello word" });
    });
  });
  it("$value token should be replaced in a custom message", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "$value is not valid. You string must contain a hello word"
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    model.someProperty = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        contains: "hell no world is not valid. You string must contain a hello word"
      });
    });
  });
  it("$value token should be replaced in a custom message", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.MinLength)(2, {
        message: (args) => {
          if (args.value.length < 2) {
            return "$value is too short, minimum length is $constraint1 characters $property";
          }
        }
      })
    ], MyClass.prototype, "name", 2);
    const model = new MyClass();
    model.name = "";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ minLength: " is too short, minimum length is 2 characters name" });
    });
  });
  it("$constraint1 token should be replaced in a custom message", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "String is not valid. You string must contain a $constraint1 word"
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    model.someProperty = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ contains: "String is not valid. You string must contain a hello word" });
    });
  });
  it("$target token should be replaced in a custom message", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "$target is not valid."
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    model.someProperty = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ contains: "MyClass is not valid." });
    });
  });
  it("$property token should be replaced in a custom message", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "$property is not valid."
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    model.someProperty = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({ contains: "someProperty is not valid." });
    });
  });
  it("should replace all token", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "$target#$property is not valid: $value must contain a $constraint1 word"
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    model.someProperty = "hell no world";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        contains: "MyClass#someProperty is not valid: hell no world must contain a hello word"
      });
    });
  });
});
describe("each", () => {
  describe("Array", () => {
    it("should apply validation to each item in the array", () => {
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Contains)("hello", {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = ["hell no world", "hello", "helo world", "hello world", "hello dear friend"];
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ contains: "each value in someProperty must contain a hello string" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class to array items (but not array itself)", () => {
      let CustomIsNotArrayConstraint = class {
        validate(value) {
          return !(value instanceof Array);
        }
      };
      CustomIsNotArrayConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customIsNotArrayConstraint", async: false })
      ], CustomIsNotArrayConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomIsNotArrayConstraint, {
          each: true
        })
      ], MyClass.prototype, "someArrayOfNonArrayItems", 2);
      const model = new MyClass();
      model.someArrayOfNonArrayItems = ["not array", "also not array", "not array at all"];
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("should apply validation via custom constraint class with synchronous logic to each item in the array", () => {
      let CustomContainsHelloConstraint = class {
        validate(value) {
          return !(value instanceof Array) && String(value).includes("hello");
        }
      };
      CustomContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customContainsHelloConstraint", async: false })
      ], CustomContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = ["hell no world", "hello", "helo world", "hello world", "hello dear friend"];
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class with async logic to each item in the array", () => {
      let CustomAsyncContainsHelloConstraint = class {
        validate(value) {
          const isValid = !(value instanceof Array) && String(value).includes("hello");
          return Promise.resolve(isValid);
        }
      };
      CustomAsyncContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customAsyncContainsHelloConstraint", async: true })
      ], CustomAsyncContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomAsyncContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = ["hell no world", "hello", "helo world", "hello world", "hello dear friend"];
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customAsyncContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class with mixed (synchronous + async) logic to each item in the array", () => {
      let CustomMixedContainsHelloConstraint = class {
        validate(value) {
          const isValid = !(value instanceof Array) && String(value).includes("hello");
          return isValid ? isValid : Promise.resolve(isValid);
        }
      };
      CustomMixedContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customMixedContainsHelloConstraint", async: true })
      ], CustomMixedContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomMixedContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = ["hell no world", "hello", "helo world", "hello world", "hello dear friend"];
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customMixedContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
  });
  describe("Set", () => {
    it("should apply validation to each item in the Set", () => {
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Contains)("hello", {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Set([
        "hell no world",
        "hello",
        "helo world",
        "hello world",
        "hello dear friend"
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ contains: "each value in someProperty must contain a hello string" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class to Set items (but not Set itself)", () => {
      let CustomIsNotSetConstraint = class {
        validate(value) {
          return !(value instanceof Set);
        }
      };
      CustomIsNotSetConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customIsNotSetConstraint", async: false })
      ], CustomIsNotSetConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomIsNotSetConstraint, {
          each: true
        })
      ], MyClass.prototype, "someSetOfNonSetItems", 2);
      const model = new MyClass();
      model.someSetOfNonSetItems = /* @__PURE__ */ new Set(["not array", "also not array", "not array at all"]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("should apply validation via custom constraint class with synchronous logic to each item in the Set", () => {
      let CustomContainsHelloConstraint = class {
        validate(value) {
          return !(value instanceof Set) && String(value).includes("hello");
        }
      };
      CustomContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customContainsHelloConstraint", async: false })
      ], CustomContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Set([
        "hell no world",
        "hello",
        "helo world",
        "hello world",
        "hello dear friend"
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class with async logic to each item in the Set", () => {
      let CustomAsyncContainsHelloConstraint = class {
        validate(value) {
          const isValid = !(value instanceof Set) && String(value).includes("hello");
          return Promise.resolve(isValid);
        }
      };
      CustomAsyncContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customAsyncContainsHelloConstraint", async: true })
      ], CustomAsyncContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomAsyncContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Set([
        "hell no world",
        "hello",
        "helo world",
        "hello world",
        "hello dear friend"
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customAsyncContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class with mixed (synchronous + async) logic to each item in the Set", () => {
      let CustomMixedContainsHelloConstraint = class {
        validate(value) {
          const isValid = !(value instanceof Set) && String(value).includes("hello");
          return isValid ? isValid : Promise.resolve(isValid);
        }
      };
      CustomMixedContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customMixedContainsHelloConstraint", async: true })
      ], CustomMixedContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomMixedContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Set([
        "hell no world",
        "hello",
        "helo world",
        "hello world",
        "hello dear friend"
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customMixedContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
  });
  describe("Map", () => {
    it("should apply validation to each item in the Map", () => {
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Contains)("hello", {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Map([
        ["key1", "hell no world"],
        ["key2", "hello"],
        ["key3", "helo world"],
        ["key4", "hello world"],
        ["key5", "hello dear friend"]
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ contains: "each value in someProperty must contain a hello string" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class to Map items (but not Map itself)", () => {
      let CustomIsNotMapConstraint = class {
        validate(value) {
          return !(value instanceof Map);
        }
      };
      CustomIsNotMapConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customIsNotMapConstraint", async: false })
      ], CustomIsNotMapConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomIsNotMapConstraint, {
          each: true
        })
      ], MyClass.prototype, "someArrayOfNonArrayItems", 2);
      const model = new MyClass();
      model.someArrayOfNonArrayItems = /* @__PURE__ */ new Map([
        ["key1", "not array"],
        ["key2", "also not array"],
        ["key3", "not array at all"]
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("should apply validation via custom constraint class with synchronous logic to each item in the Map", () => {
      let CustomContainsHelloConstraint = class {
        validate(value) {
          return !(value instanceof Map) && String(value).includes("hello");
        }
      };
      CustomContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customContainsHelloConstraint", async: false })
      ], CustomContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Map([
        ["key1", "hell no world"],
        ["key2", "hello"],
        ["key3", "helo world"],
        ["key4", "hello world"],
        ["key5", "hello dear friend"]
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class with async logic to each item in the Map", () => {
      let CustomAsyncContainsHelloConstraint = class {
        validate(value) {
          const isValid = !(value instanceof Map) && String(value).includes("hello");
          return Promise.resolve(isValid);
        }
      };
      CustomAsyncContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customAsyncContainsHelloConstraint", async: true })
      ], CustomAsyncContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomAsyncContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Map([
        ["key1", "hell no world"],
        ["key2", "hello"],
        ["key3", "helo world"],
        ["key4", "hello world"],
        ["key5", "hello dear friend"]
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customAsyncContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
    it("should apply validation via custom constraint class with mixed (synchronous + async) logic to each item in the Map", () => {
      let CustomMixedContainsHelloConstraint = class {
        validate(value) {
          const isValid = !(value instanceof Map) && String(value).includes("hello");
          return isValid ? isValid : Promise.resolve(isValid);
        }
      };
      CustomMixedContainsHelloConstraint = __decorateClass([
        (0, import_decorators.ValidatorConstraint)({ name: "customMixedContainsHelloConstraint", async: true })
      ], CustomMixedContainsHelloConstraint);
      class MyClass {
      }
      __decorateClass([
        (0, import_decorators.Validate)(CustomMixedContainsHelloConstraint, {
          each: true
        })
      ], MyClass.prototype, "someProperty", 2);
      const model = new MyClass();
      model.someProperty = /* @__PURE__ */ new Map([
        ["key1", "hell no world"],
        ["key2", "hello"],
        ["key3", "helo world"],
        ["key4", "hello world"],
        ["key5", "hello dear friend"]
      ]);
      return validator.validate(model).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({ customMixedContainsHelloConstraint: "" });
        expect(errors[0].value).toEqual(model.someProperty);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("someProperty");
      });
    });
  });
});
describe("groups", () => {
  function expectTitleContains(error) {
    expect(error.constraints).toEqual({ contains: "title must contain a hello string" });
  }
  function expectTextContains(error) {
    expect(error.constraints).toEqual({ contains: "text must contain a bye string" });
  }
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Contains)("hello", {
      groups: ["title-validation"]
    })
  ], MyClass.prototype, "title", 2);
  __decorateClass([
    (0, import_decorators.Contains)("bye", {
      groups: ["text-validation"]
    })
  ], MyClass.prototype, "text", 2);
  const validTitle = new MyClass();
  validTitle.title = "hello world";
  validTitle.text = "hello world";
  const validText = new MyClass();
  validText.title = "bye world";
  validText.text = "bye world";
  const validBoth = new MyClass();
  validBoth.title = "hello world";
  validBoth.text = "bye world";
  const validNone = new MyClass();
  validNone.title = "bye world";
  validNone.text = "hello world";
  describe("should validate only properties of the given group: title-validation", () => {
    it("with valid title", () => {
      return validator.validate(validTitle, { groups: ["title-validation"] }).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with valid text", () => {
      return validator.validate(validText, { groups: ["title-validation"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTitleContains(errors[0]);
      });
    });
    it("with both valid", () => {
      return validator.validate(validBoth, { groups: ["title-validation"] }).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with none valid", () => {
      return validator.validate(validNone, { groups: ["title-validation"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTitleContains(errors[0]);
      });
    });
  });
  describe("should validate only properties of the given group: text-validation", () => {
    it("with valid title", () => {
      return validator.validate(validTitle, { groups: ["text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTextContains(errors[0]);
      });
    });
    it("with valid text", () => {
      return validator.validate(validText, { groups: ["text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with both valid", () => {
      return validator.validate(validBoth, { groups: ["text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with none valid", () => {
      return validator.validate(validNone, { groups: ["text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTextContains(errors[0]);
      });
    });
  });
  describe("should validate only properties of the given groups: both groups", () => {
    it("with valid title", () => {
      return validator.validate(validTitle, { groups: ["title-validation", "text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTextContains(errors[0]);
      });
    });
    it("with valid text", () => {
      return validator.validate(validText, { groups: ["title-validation", "text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTitleContains(errors[0]);
      });
    });
    it("with both valid", () => {
      return validator.validate(validBoth, { groups: ["title-validation", "text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with none valid", () => {
      return validator.validate(validNone, { groups: ["title-validation", "text-validation"] }).then((errors) => {
        expect(errors.length).toEqual(2);
        expectTitleContains(errors[0]);
        expectTextContains(errors[1]);
      });
    });
  });
  describe("should validate all if no group is given", () => {
    it("with valid title", () => {
      return validator.validate(validTitle).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTextContains(errors[0]);
      });
    });
    it("with valid text", () => {
      return validator.validate(validText).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTitleContains(errors[0]);
      });
    });
    it("with both valid", () => {
      return validator.validate(validBoth).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with none valid", () => {
      return validator.validate(validNone).then((errors) => {
        expect(errors.length).toEqual(2);
        expectTitleContains(errors[0]);
        expectTextContains(errors[1]);
      });
    });
  });
  describe("should validate all groups if empty group array is given", () => {
    it("with valid title", () => {
      return validator.validate(validTitle, { groups: [] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTextContains(errors[0]);
      });
    });
    it("with valid text", () => {
      return validator.validate(validText, { groups: [] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTitleContains(errors[0]);
      });
    });
    it("with both valid", () => {
      return validator.validate(validBoth, { groups: [] }).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
    it("with none valid", () => {
      return validator.validate(validNone, { groups: [] }).then((errors) => {
        expect(errors.length).toEqual(2);
        expectTitleContains(errors[0]);
        expectTextContains(errors[1]);
      });
    });
  });
  describe("multiple groups per property", () => {
    class MyClass2 {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", { groups: ["contains"] }),
      (0, import_decorators.Matches)(/.*stranger.*/, { groups: ["matches"] })
    ], MyClass2.prototype, "title", 2);
    function expectTitleMatches(error) {
      expect(error.constraints).toEqual({ matches: "title must match /.*stranger.*/ regular expression" });
    }
    const validContains = new MyClass2();
    validContains.title = "hello";
    const validMatches = new MyClass2();
    validMatches.title = "stranger";
    const validBoth2 = new MyClass2();
    validBoth2.title = "hello stranger";
    const validNone2 = new MyClass2();
    validNone2.title = "howdy rowdy";
    describe("group: contains", () => {
      it("with valid contains", () => {
        return validator.validate(validContains, { groups: ["contains"] }).then((errors) => {
          expect(errors.length).toEqual(0);
        });
      });
      it("with valid matches", () => {
        return validator.validate(validMatches, { groups: ["contains"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expectTitleContains(errors[0]);
        });
      });
      it("with valid both", () => {
        return validator.validate(validBoth2, { groups: ["contains"] }).then((errors) => {
          expect(errors.length).toEqual(0);
        });
      });
      it("with valid none", () => {
        return validator.validate(validNone2, { groups: ["contains"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expectTitleContains(errors[0]);
        });
      });
    });
    describe("group: matches", () => {
      it("with valid contains", () => {
        return validator.validate(validContains, { groups: ["matches"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expectTitleMatches(errors[0]);
        });
      });
      it("with valid matches", () => {
        return validator.validate(validMatches, { groups: ["matches"] }).then((errors) => {
          expect(errors.length).toEqual(0);
        });
      });
      it("with valid both", () => {
        return validator.validate(validBoth2, { groups: ["matches"] }).then((errors) => {
          expect(errors.length).toEqual(0);
        });
      });
      it("with valid none", () => {
        return validator.validate(validNone2, { groups: ["matches"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expectTitleMatches(errors[0]);
        });
      });
    });
    describe("groups: contains & matches", () => {
      it("with valid contains", () => {
        return validator.validate(validContains, { groups: ["contains", "matches"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expectTitleMatches(errors[0]);
        });
      });
      it("with valid matches", () => {
        return validator.validate(validMatches, { groups: ["contains", "matches"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expectTitleContains(errors[0]);
        });
      });
      it("with valid both", () => {
        return validator.validate(validBoth2, { groups: ["contains", "matches"] }).then((errors) => {
          expect(errors.length).toEqual(0);
        });
      });
      it("with valid none", () => {
        return validator.validate(validNone2, { groups: ["contains", "matches"] }).then((errors) => {
          expect(errors.length).toEqual(1);
          expect(errors[0].constraints).toEqual({
            contains: "title must contain a hello string",
            matches: "title must match /.*stranger.*/ regular expression"
          });
        });
      });
    });
  });
  describe("ValidationOptions.always", function() {
    class MyClass2 {
    }
    __decorateClass([
      (0, import_decorators.Contains)("noOptions")
    ], MyClass2.prototype, "noOptions", 2);
    __decorateClass([
      (0, import_decorators.Contains)("groupA", {
        groups: ["A"]
      })
    ], MyClass2.prototype, "groupA", 2);
    __decorateClass([
      (0, import_decorators.Contains)("alwaysFalse", {
        always: false
      })
    ], MyClass2.prototype, "alwaysFalse", 2);
    __decorateClass([
      (0, import_decorators.Contains)("alwaysTrue", {
        always: true
      })
    ], MyClass2.prototype, "alwaysTrue", 2);
    const model1 = new MyClass2();
    model1.noOptions = "XXX";
    model1.groupA = "groupA";
    model1.alwaysFalse = "alwaysFalse";
    model1.alwaysTrue = "alwaysTrue";
    const model2 = new MyClass2();
    model2.noOptions = "noOptions";
    model2.groupA = "XXX";
    model2.alwaysFalse = "alwaysFalse";
    model2.alwaysTrue = "alwaysTrue";
    const model3 = new MyClass2();
    model3.noOptions = "noOptions";
    model3.groupA = "groupA";
    model3.alwaysFalse = "XXX";
    model3.alwaysTrue = "alwaysTrue";
    const model4 = new MyClass2();
    model4.noOptions = "noOptions";
    model4.groupA = "groupA";
    model4.alwaysFalse = "alwaysFalse";
    model4.alwaysTrue = "XXX";
    it("should validate decorator without options", function() {
      return validator.validate(model1, { always: true, groups: ["A"] }).then((errors) => {
        expect(errors).toHaveLength(1);
      });
    });
    it("should not validate decorator with groups if validating without matching groups", function() {
      return validator.validate(model2, { always: true, groups: ["B"] }).then((errors) => {
        expect(errors).toHaveLength(0);
      });
    });
    it("should not validate decorator with always set to false", function() {
      return validator.validate(model3, { always: true, groups: ["A"] }).then((errors) => {
        expect(errors).toHaveLength(0);
      });
    });
    it("should validate decorator with always set to true", function() {
      return validator.validate(model4, { always: true, groups: ["A"] }).then((errors) => {
        expect(errors).toHaveLength(1);
      });
    });
  });
  describe("strictGroups", function() {
    class MyClass2 {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        groups: ["A"]
      })
    ], MyClass2.prototype, "title", 2);
    const model1 = new MyClass2();
    it("should ignore decorators with groups if validating without groups", function() {
      return validator.validate(model1, { strictGroups: true }).then((errors) => {
        expect(errors).toHaveLength(0);
      });
    });
    it("should ignore decorators with groups if validating with empty groups array", function() {
      return validator.validate(model1, { strictGroups: true, groups: [] }).then((errors) => {
        expect(errors).toHaveLength(0);
      });
    });
    it("should include decorators with groups if validating with matching groups", function() {
      return validator.validate(model1, { strictGroups: true, groups: ["A"] }).then((errors) => {
        expect(errors).toHaveLength(1);
        expectTitleContains(errors[0]);
      });
    });
    it("should not include decorators with groups if validating with different groups", function() {
      return validator.validate(model1, { strictGroups: true, groups: ["B"] }).then((errors) => {
        expect(errors).toHaveLength(0);
      });
    });
  });
  describe("always", () => {
    class MyClass2 {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        groups: ["sometimes"]
      })
    ], MyClass2.prototype, "title", 2);
    __decorateClass([
      (0, import_decorators.Contains)("bye", {
        groups: ["always"],
        always: true
      })
    ], MyClass2.prototype, "text", 2);
    const model = new MyClass2();
    it("should always validate a marked field even if another group is specified", () => {
      return validator.validate(model, { groups: ["sometimes"] }).then((errors) => {
        expect(errors.length).toEqual(2);
        expectTitleContains(errors[0]);
        expectTextContains(errors[1]);
      });
    });
    it("should always validate a marked field if its group is specified also (doubly enabled)", () => {
      return validator.validate(model, { groups: ["always"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectTextContains(errors[0]);
      });
    });
    it("should always validate *all* fields if group is not specified", () => {
      return validator.validate(model, { groups: void 0 }).then((errors) => {
        expect(errors.length).toEqual(2);
        expectTitleContains(errors[0]);
        expectTextContains(errors[1]);
      });
    });
    it("should always validate *all* fields if groups array is empty", () => {
      return validator.validate(model, { groups: [] }).then((errors) => {
        expect(errors.length).toEqual(2);
        expectTitleContains(errors[0]);
        expectTextContains(errors[1]);
      });
    });
  });
  describe("groups - nested", () => {
    class Nested {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        groups: ["always"],
        always: true
      })
    ], Nested.prototype, "text", 2);
    class Root {
      constructor() {
        this.always = new Nested();
        this.sometimes = new Nested();
        this.other = new Nested();
      }
    }
    __decorateClass([
      (0, import_decorators.ValidateNested)({ groups: ["always"], always: true })
    ], Root.prototype, "always", 2);
    __decorateClass([
      (0, import_decorators.ValidateNested)({ groups: ["sometimes"] })
    ], Root.prototype, "sometimes", 2);
    __decorateClass([
      (0, import_decorators.ValidateNested)({ groups: ["other"] })
    ], Root.prototype, "other", 2);
    const model = new Root();
    function expectChildConstraint(error, childName) {
      expect(error.property).toEqual(childName);
      expect(error.children.length).toEqual(1);
      expect(error.children[0].property).toEqual("text");
      expect(error.children[0].constraints).toEqual({ contains: "text must contain a hello string" });
    }
    it("should validate all children if no group is given", () => {
      return validator.validate(model, { groups: void 0 }).then((errors) => {
        expect(errors.length).toEqual(3);
        expectChildConstraint(errors[0], "always");
        expectChildConstraint(errors[1], "sometimes");
        expectChildConstraint(errors[2], "other");
      });
    });
    it("should validate only the given group + always", () => {
      return validator.validate(model, { groups: ["sometimes"] }).then((errors) => {
        expect(errors.length).toEqual(2);
        expectChildConstraint(errors[0], "always");
        expectChildConstraint(errors[1], "sometimes");
      });
    });
    it("should validate only the given group + always", () => {
      return validator.validate(model, { groups: ["always"] }).then((errors) => {
        expect(errors.length).toEqual(1);
        expectChildConstraint(errors[0], "always");
      });
    });
  });
});
describe("context", () => {
  it("should map context", () => {
    function IsLongerThan(property, validationOptions) {
      return function(object, propertyName) {
        (0, import_src.registerDecorator)({
          target: object.constructor,
          propertyName,
          options: validationOptions,
          constraints: [property],
          name: "isLongerThan",
          validator: {
            validate(value, args) {
              const [relatedPropertyName] = args.constraints;
              const relatedValue = args.object[relatedPropertyName];
              if (relatedValue === void 0 || relatedValue === null)
                return true;
              return typeof value === "string" && typeof relatedValue === "string" && value.length > relatedValue.length;
            }
          }
        });
      };
    }
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "String is not valid. You string must contain a hello word",
        context: {
          hi: "there"
        }
      })
    ], MyClass.prototype, "someProperty", 2);
    __decorateClass([
      (0, import_decorators.Contains)("bye", {
        message: "String is not valid. You string must contain a bye word",
        context: {
          bye: "now"
        }
      })
    ], MyClass.prototype, "someOtherProperty", 2);
    __decorateClass([
      (0, import_decorators.IsDefined)({
        context: {
          foo: "bar"
        }
      })
    ], MyClass.prototype, "requiredProperty", 2);
    __decorateClass([
      IsLongerThan("lastName", {
        context: { baz: "qux" },
        message: "$property must be longer then $constraint1. Given value: $value"
      })
    ], MyClass.prototype, "firstName", 2);
    const model = new MyClass();
    model.firstName = "Short";
    model.lastName = "LongerThanFirstName";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(4);
      expect(errors[0].contexts["contains"]).toEqual({ hi: "there" });
      expect(errors[1].contexts["contains"]).toEqual({ bye: "now" });
      expect(errors[2].contexts["isDefined"]).toEqual({ foo: "bar" });
      expect(errors[3].contexts["isLongerThan"]).toEqual({ baz: "qux" });
    });
  });
  it("should map multiple context on a single property for different constraints", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "String is not valid. You string must contain a hello word",
        context: {
          hi: "there"
        }
      }),
      (0, import_decorators.MinLength)(20, {
        context: {
          whats: "up"
        }
      })
    ], MyClass.prototype, "someProperty", 2);
    const model = new MyClass();
    model.someProperty = "bippity";
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].contexts["contains"]).toEqual({ hi: "there" });
      expect(errors[0].contexts["minLength"]).toEqual({ whats: "up" });
    });
  });
  it("should not map no context", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.Contains)("hello", {
        message: "String is not valid. You string must contain a hello word"
      })
    ], MyClass.prototype, "someProperty", 2);
    __decorateClass([
      (0, import_decorators.Contains)("bye", {
        message: "String is not valid. You string must contain a bye word",
        context: {
          bye: "now"
        }
      })
    ], MyClass.prototype, "someOtherProperty", 2);
    const model = new MyClass();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(2);
      expect(errors[0].contexts).toBeUndefined();
      expect(errors[1].contexts["contains"]).toEqual({ bye: "now" });
    });
  });
  it("should stop at first error.", () => {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.IsDefined)({
        message: "isDefined"
      }),
      (0, import_decorators.Contains)("hello", {
        message: "String is not valid. You string must contain a hello word"
      })
    ], MyClass.prototype, "sameProperty", 2);
    const model = new MyClass();
    return validator.validate(model, { stopAtFirstError: true }).then((errors) => {
      console.log();
      expect(errors.length).toEqual(1);
      expect(Object.keys(errors[0].constraints).length).toBe(1);
      expect(errors[0].constraints["isDefined"]).toBe("isDefined");
    });
  });
});
//# sourceMappingURL=validation-options.spec.js.map
