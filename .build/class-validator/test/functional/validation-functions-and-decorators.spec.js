"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var validation_functions_and_decorators_spec_exports = {};
__export(validation_functions_and_decorators_spec_exports, {
  checkInvalidValues: () => checkInvalidValues,
  checkReturnedError: () => checkReturnedError,
  checkValidValues: () => checkValidValues
});
module.exports = __toCommonJS(validation_functions_and_decorators_spec_exports);
var import_decorators = require("../../src/decorator/decorators");
var import_Validator = require("../../src/validation/Validator");
var import_ValidationUtils = require("../../src/validation/ValidationUtils");
function checkValidValues(object, values, validatorOptions) {
  const validator2 = new import_Validator.Validator();
  const promises = values.map((value) => {
    object.someProperty = value;
    return validator2.validate(object, validatorOptions).then((errors) => {
      expect(errors.length).toEqual(0);
      if (errors.length !== 0) {
        console.log(`Unexpected errors: ${JSON.stringify(errors)}`);
        throw new Error("Unexpected validation errors");
      }
    });
  });
  return Promise.all(promises);
}
function checkInvalidValues(object, values, validatorOptions) {
  const validator2 = new import_Validator.Validator();
  const promises = values.map((value) => {
    object.someProperty = value;
    return validator2.validate(object, validatorOptions).then((errors) => {
      expect(errors.length).toEqual(1);
      if (errors.length !== 1) {
        throw new Error("Missing validation errors");
      }
    }).catch((error) => {
      console.log(error);
    });
  });
  return Promise.all(promises);
}
function checkReturnedError(object, values, validationType, message, validatorOptions) {
  const validator2 = new import_Validator.Validator();
  const promises = values.map((value) => {
    object.someProperty = value;
    return validator2.validate(object, validatorOptions).then((errors) => {
      expect(errors.length).toEqual(1);
      expect(errors[0].target).toEqual(object);
      expect(errors[0].property).toEqual("someProperty");
      expect(errors[0].constraints).toEqual({ [validationType]: message });
      expect(errors[0].value).toEqual(value);
    });
  });
  return Promise.all(promises);
}
const validator = new import_Validator.Validator();
describe("IsDefined", () => {
  const validValues = [0, 1, true, false, "", "0", "1234", -1];
  const invalidValues = [null, void 0];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsDefined)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if validator.validate said that its valid with skipUndefinedProperties set to true", () => {
    return checkValidValues(new MyClass(), validValues, { skipUndefinedProperties: true });
  });
  it("should fail if validator.validate said that its invalid with skipUndefinedProperties set to true", () => {
    return checkInvalidValues(new MyClass(), invalidValues, { skipUndefinedProperties: true });
  });
  it("should not fail if validator.validate said that its valid with skipNullProperties set to true", () => {
    return checkValidValues(new MyClass(), validValues, { skipNullProperties: true });
  });
  it("should fail if validator.validate said that its invalid with skipNullProperties set to true", () => {
    return checkInvalidValues(new MyClass(), invalidValues, { skipNullProperties: true });
  });
  it("should not fail if validator.validate said that its valid with skipMissingProperties set to true", () => {
    return checkValidValues(new MyClass(), validValues, { skipMissingProperties: true });
  });
  it("should fail if validator.validate said that its invalid with skipMissingProperties set to true", () => {
    return checkInvalidValues(new MyClass(), invalidValues, { skipMissingProperties: true });
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isDefined)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isDefined)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isDefined";
    const message = "someProperty should not be null or undefined";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Equals", () => {
  const constraint = "Alex";
  const validValues = ["Alex"];
  const invalidValues = ["Alexxx"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Equals)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.equals)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.equals)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "equals";
    const message = "someProperty must be equal to " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("NotEquals", () => {
  const constraint = "Alex";
  const validValues = ["Alexxx"];
  const invalidValues = ["Alex"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.NotEquals)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.notEquals)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.notEquals)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "notEquals";
    const message = "someProperty should not be equal to " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsEmpty", () => {
  const validValues = [null, void 0, ""];
  const invalidValues = ["0", 0, 1, false, true];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsEmpty)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isEmpty)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isEmpty)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isEmpty";
    const message = "someProperty must be empty";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsNotEmpty", () => {
  const validValues = ["a", "abc"];
  const invalidValues = ["", void 0, null];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNotEmpty)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isNotEmpty)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isNotEmpty)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isNotEmpty";
    const message = "someProperty should not be empty";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsIn", () => {
  const constraint = ["foo", "bar"];
  const validValues = ["foo", "bar"];
  const invalidValues = ["foobar", "barfoo", ""];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsIn)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isIn)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isIn)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIn";
    const message = "someProperty must be one of the following values: " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsNotIn", () => {
  const constraint = ["foo", "bar"];
  const validValues = ["foobar", "barfoo", ""];
  const invalidValues = ["foo", "bar"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNotIn)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isNotIn)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isNotIn)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isNotIn";
    const message = "someProperty should not be one of the following values: " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsBoolean", () => {
  const validValues = [true, false];
  const invalidValues = [0, 1, "true", null, void 0];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsBoolean)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isBoolean)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isBoolean)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isBoolean";
    const message = "someProperty must be a boolean value";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsLatLong", () => {
  const validValues = ["27.6945311,85.3446311", "27.675509,85.2100893"];
  const invalidValues = ["276945311,853446311", "asas,as.as12"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsLatLong)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
});
describe("IsLatitude", () => {
  const validValues = ["27.6945311", "27.675509", 27.675509];
  const invalidValues = ["276945311", "asas", 1234222, 5678921];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsLatitude)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
});
describe("IsLongitude", () => {
  const validValues = ["85.3446311", "85.2100893", 85.2100893];
  const invalidValues = ["853446311", "as.as12", 12345, 737399];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsLongitude)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
});
describe("IsDate", () => {
  const validValues = [new Date()];
  const invalidValues = [1, true, false, "Mon Aug 17 2015 00:24:56 GMT-0500 (CDT)", "2009-05-19 14:39:22-06:00"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsDate)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isDate)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isDate)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isDate";
    const message = "someProperty must be a Date instance";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsNumber", () => {
  const validValues = [0, 1, 2, 3, 4, 5.4, -10];
  const invalidValues = ["1", "0", true, false, "-100", "abc", void 0, null];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNumber)()
  ], MyClass.prototype, "someProperty", 2);
  class NaNTestClass {
  }
  __decorateClass([
    (0, import_decorators.IsNumber)({ allowNaN: true })
  ], NaNTestClass.prototype, "someProperty", 2);
  class InfinityTestClass {
  }
  __decorateClass([
    (0, import_decorators.IsNumber)({ allowInfinity: true })
  ], InfinityTestClass.prototype, "someProperty", 2);
  class MaxDecimalPlacesTest {
  }
  __decorateClass([
    (0, import_decorators.IsNumber)({ maxDecimalPlaces: 3 })
  ], MaxDecimalPlacesTest.prototype, "someProperty", 2);
  class ZeroDecimalPlacesTest {
  }
  __decorateClass([
    (0, import_decorators.IsNumber)({ maxDecimalPlaces: 0 })
  ], ZeroDecimalPlacesTest.prototype, "someProperty", 2);
  it("should fail if NaN passed without allowing NaN values", () => {
    return checkInvalidValues(new MyClass(), [NaN]);
  });
  it("should fail if Infinity passed without allowing NaN values", () => {
    return checkInvalidValues(new MyClass(), [Infinity, -Infinity]);
  });
  it("should not fail if NaN passed and NaN as value is allowed", () => {
    return checkValidValues(new NaNTestClass(), [NaN]);
  });
  it("should not fail if Infinity passed and Infinity as value is allowed", () => {
    return checkValidValues(new InfinityTestClass(), [Infinity, -Infinity]);
  });
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isNumber)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isNumber)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isNumber";
    const message = "someProperty must be a number conforming to the specified constraints";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
  it("should pass if number of decimal places within maxDecimalPlaces", () => {
    return checkValidValues(new MaxDecimalPlacesTest(), [1.123]);
  });
  it("should fail if number of decimal places exceeds maxDecimalPlaces", () => {
    return checkInvalidValues(new MaxDecimalPlacesTest(), [1.1234]);
  });
  it("should pass if number of decimal places is zero", () => {
    return checkValidValues(new ZeroDecimalPlacesTest(), [-10, -1, 0, 1, 10]);
  });
  it("should fail if number of decimal places is not zero", () => {
    return checkInvalidValues(new ZeroDecimalPlacesTest(), [-11.1, -2.2, -0.1, 0.1, 2.2, 11.1]);
  });
});
describe("IsInt", () => {
  const validValues = [2, 4, 100, 1e3];
  const invalidValues = ["01", "-01", "000", "100e10", "123.123", "   ", "", 2.5, -0.1];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsInt)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isInt)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isInt)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isInt";
    const message = "someProperty must be an integer number";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsString", () => {
  const validValues = ["true", "false", "hello", "0", "", "1"];
  const invalidValues = [true, false, 1, 2, null, void 0];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsString)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isString)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isString)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isString";
    const message = "someProperty must be a string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsDateString", () => {
  const validValues = [
    "2017-06-06T17:04:42.081Z",
    "2017-06-06T17:04:42.081",
    "2018-01-04T08:15:30",
    "2018-01-04T08:15:30Z",
    "2018-01-04T08:15:30+04:00",
    "2018-01-04T08:15:30+04",
    "2020-03-26T11:00:01-03:00",
    "2020-03-26T11:00:01-03",
    "2019-09-03T20:16:24.12Z"
  ];
  const invalidValues = [
    true,
    false,
    1,
    2,
    null,
    void 0,
    "text",
    "text2018-01-04T08:15:30+04",
    "2018-01-04T08:15:30Ztext",
    "2019-18-13T22:14:14.761Z",
    "2019-12-39T22:14:14.761Z",
    "2019-12-31T29:14:14.761Z",
    "2019-00-31T29:14:14.761Z",
    "2019-01-00T29:14:14.761Z",
    "2019-09-03T20:16:24.12-5:00",
    "2019-09-03T20:16:24.12+5:00",
    "2019-09-03T20:16:24.12-05:0",
    "2019-09-03T20:16:24.12+05:0"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsDateString)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isDateString)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isDateString)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isDateString";
    const message = "someProperty must be a valid ISO 8601 date string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsArray", () => {
  const validValues = [[], [1, 2, 3], [0, 0, 0], [""], [0], [void 0], [{}], []];
  const invalidValues = [true, false, 1, {}, null, void 0];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsArray)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isArray)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isArray)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isArray";
    const message = "someProperty must be an array";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsEnum", () => {
  let MyEnum;
  ((MyEnum2) => {
    MyEnum2[MyEnum2["First"] = 1] = "First";
    MyEnum2[MyEnum2["Second"] = 999] = "Second";
  })(MyEnum || (MyEnum = {}));
  let MyStringEnum;
  ((MyStringEnum2) => {
    MyStringEnum2["First"] = "first";
    MyStringEnum2["Second"] = "second";
  })(MyStringEnum || (MyStringEnum = {}));
  const validValues = [1 /* First */, 999 /* Second */];
  const validStringValues = ["first" /* First */, "second" /* Second */];
  const invalidValues = [true, false, 0, {}, null, void 0, "F2irst"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsEnum)(MyEnum)
  ], MyClass.prototype, "someProperty", 2);
  class MyClass2 {
  }
  __decorateClass([
    (0, import_decorators.IsEnum)(MyStringEnum)
  ], MyClass2.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should not fail if validator.validate said that its valid (string enum)", () => {
    return checkValidValues(new MyClass2(), validStringValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should fail if validator.validate said that its invalid (string enum)", () => {
    return checkInvalidValues(new MyClass2(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isEnum)(value, MyEnum)).toBeTruthy());
  });
  it("should not fail if method in validator said that its valid (string enum)", () => {
    validStringValues.forEach((value) => expect((0, import_decorators.isEnum)(value, MyStringEnum)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isEnum)(value, MyEnum)).toBeFalsy());
  });
  it("should fail if method in validator said that its invalid (string enum)", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isEnum)(value, MyStringEnum)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isEnum";
    const message = "someProperty must be a valid enum value";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
  it("should return error object with proper data (string enum)", () => {
    const validationType = "isEnum";
    const message = "someProperty must be a valid enum value";
    checkReturnedError(new MyClass2(), invalidValues, validationType, message);
  });
});
describe("IsDivisibleBy", () => {
  const constraint = 2;
  const validValues = [2, 4, 100, 1e3];
  const invalidValues = ["", void 0, null];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsDivisibleBy)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isDivisibleBy)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isDivisibleBy)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isDivisibleBy";
    const message = "someProperty must be divisible by " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsPositive", () => {
  const validValues = [3, 5e3];
  const invalidValues = [
    "-1",
    "-2",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "100000",
    -500,
    -123,
    -1,
    "   ",
    ""
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsPositive)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isPositive)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isPositive)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isPositive";
    const message = "someProperty must be a positive number";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsNegative", () => {
  const validValues = [-3, -5e3, -0.1];
  const invalidValues = [
    "-1",
    "-2",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "100000",
    500,
    123,
    1,
    "   ",
    ""
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNegative)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isNegative)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isNegative)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isNegative";
    const message = "someProperty must be a negative number";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Min", () => {
  const constraint = 10;
  const validValues = [10, 11, 20, 30, 40];
  const invalidValues = [2, 3, 4, 5, 6, 7, 8, 9, -10];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Min)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.min)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.min)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "min";
    const message = "someProperty must not be less than " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Max", () => {
  const constraint = 10;
  const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, -10, 10];
  const invalidValues = [11, 20, 30, 40];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Max)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.max)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.max)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "max";
    const message = "someProperty must not be greater than " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("MinDate", () => {
  const constraint = new Date(1995, 11, 17);
  const validValues = [new Date()];
  const invalidValues = [new Date(1994, 11, 17)];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.MinDate)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.minDate)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.minDate)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "minDate";
    const message = "minimal allowed date for someProperty is " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("MaxDate", () => {
  const constraint = new Date(1995, 11, 17);
  const validValues = [new Date(1994, 11, 17)];
  const invalidValues = [new Date()];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.MaxDate)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.maxDate)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.maxDate)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "maxDate";
    const message = "maximal allowed date for someProperty is " + (0, import_ValidationUtils.constraintToString)(constraint);
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsBooleanString", () => {
  const validValues = ["1", "0", "true", "false"];
  const invalidValues = ["2", "3", "falze"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsBooleanString)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isBooleanString)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isBooleanString)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isBooleanString";
    const message = "someProperty must be a boolean string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsNumberString", () => {
  const validValues = ["123", "123.123", "00123", "-00123", "0", "-0", "+123"];
  const invalidValues = [" ", "."];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNumberString)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isNumberString)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isNumberString)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isNumberString";
    const message = "someProperty must be a number string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Contains", () => {
  const constraint = "hello";
  const validValues = ["hello world"];
  const invalidValues = [null, void 0, "bye world"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Contains)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.contains)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.contains)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "contains";
    const message = "someProperty must contain a " + (0, import_ValidationUtils.constraintToString)(constraint) + " string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("NotContains", () => {
  const constraint = "hello";
  const validValues = ["bye world"];
  const invalidValues = [null, void 0, "hello world"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.NotContains)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.notContains)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.notContains)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "notContains";
    const message = "someProperty should not contain a " + (0, import_ValidationUtils.constraintToString)(constraint) + " string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsAlpha", () => {
  const constraint = "en-GB";
  const validValues = ["hellomynameisalex"];
  const invalidValues = [null, void 0, "hello1mynameisalex"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsAlpha)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isAlpha)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isAlpha)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isAlpha";
    const message = "someProperty must contain only letters (a-zA-Z)";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsAlphanumeric", () => {
  const constraint = "";
  const validValues = ["hellomyname1salex"];
  const invalidValues = [null, void 0, "hell*mynameisalex"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsAlphanumeric)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isAlphanumeric)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isAlphanumeric)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isAlphanumeric";
    const message = "someProperty must contain only letters and numbers";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsAscii", () => {
  const constraint = "";
  const validValues = ["hellomyname1salex"];
  const invalidValues = [null, void 0, "hell*mynameis\u043B\u0435\u0445\u0430"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsAscii)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isAscii)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isAscii)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isAscii";
    const message = "someProperty must contain only ASCII characters";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsDecimal", () => {
  const validValues = [
    "100.0",
    "100.1",
    "100.3",
    "100.4",
    "100.5",
    "100.6",
    "100.7",
    "100.8",
    "100.9",
    "1.9",
    "-1.9",
    "-124.1"
  ];
  const invalidValues = [
    null,
    void 0,
    "hello",
    "",
    "1",
    "1.",
    "1,",
    "-1",
    "100",
    "100,100",
    "100.23",
    "100.214141",
    "100,23",
    "100,2143192"
  ];
  const isDecimalOptions = {
    force_decimal: true,
    decimal_digits: "1",
    locale: "en-US"
  };
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsDecimal)(isDecimalOptions)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isDecimal)(value, isDecimalOptions)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isDecimal)(value, isDecimalOptions)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isDecimal";
    const message = "someProperty is not a valid decimal number.";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsBase32", () => {
  const constraint = "";
  const validValues = [
    "ZG======",
    "JBSQ====",
    "JBSWY===",
    "JBSWY3A=",
    "JBSWY3DP",
    "JBSWY3DPEA======",
    "K5SWYY3PNVSSA5DPEBXG6ZA=",
    "K5SWYY3PNVSSA5DPEBXG6==="
  ];
  const invalidValues = [
    null,
    void 0,
    "12345",
    "",
    "JBSWY3DPtesting123",
    "ZG=====",
    "Z======",
    "Zm=8JBSWY3DP",
    "=m9vYg==",
    "Zm9vYm/y===="
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsBase32)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isBase32)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isBase32)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isBase32";
    const message = "someProperty must be base32 encoded";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsBase64", () => {
  const constraint = "";
  const validValues = ["aGVsbG8="];
  const invalidValues = [null, void 0, "hell*mynameisalex"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsBase64)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isBase64)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isBase64)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isBase64";
    const message = "someProperty must be base64 encoded";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsIBAN", () => {
  const constraint = "";
  const validValues = ["GR96 0810 0010 0000 0123 4567 890"];
  const invalidValues = [null, void 0, "XX22YYY1234567890123"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsIBAN)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isIBAN)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isIBAN)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIBAN";
    const message = "someProperty must be an IBAN";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsBIC", () => {
  const constraint = "";
  const validValues = ["SBICKEN1345"];
  const invalidValues = [null, void 0, "SBIC23NXXX"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsBIC)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isBIC)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isBIC)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isBIC";
    const message = "someProperty must be a BIC or SWIFT code";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsEthereumAddress", () => {
  const constraint = "";
  const validValues = ["0x683E07492fBDfDA84457C16546ac3f433BFaa128"];
  const invalidValues = [null, void 0, "0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b422222"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsEthereumAddress)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isEthereumAddress)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isEthereumAddress)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isEthereumAddress";
    const message = "someProperty must be an Ethereum address";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsBtcAddress", () => {
  const constraint = "";
  const validValues = ["bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"];
  const invalidValues = [null, void 0, "pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsBtcAddress)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isBtcAddress)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isBtcAddress)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isBtcAddress";
    const message = "someProperty must be a BTC address";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsDataURI", () => {
  const constraint = "";
  const validValues = ["data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E"];
  const invalidValues = [null, void 0, "data:HelloWorld"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsDataURI)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isDataURI)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isDataURI)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isDataURI";
    const message = "someProperty must be a data uri format";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsHSL", () => {
  const constraint = "";
  const validValues = ["hsl(-540, 03%, 4%)"];
  const invalidValues = [null, void 0, "hsl(-0160, 100%, 100a)"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsHSL)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isHSL)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isHSL)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isHSL";
    const message = "someProperty must be a HSL color";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsRgbColor", () => {
  const constraint = "";
  const validValues = ["rgba(255,255,255,0.1)"];
  const invalidValues = [null, void 0, "rgba(0,0,0)"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsRgbColor)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isRgbColor)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isRgbColor)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isRgbColor";
    const message = "someProperty must be RGB color";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsIdentityCard", () => {
  const constraint = "he-IL";
  const validValues = ["335240479"];
  const invalidValues = [null, void 0, "A1234567L"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsIdentityCard)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isIdentityCard)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isIdentityCard)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIdentityCard";
    const message = "someProperty must be a identity card number";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsEAN", () => {
  const constraint = "";
  const validValues = ["9771234567003"];
  const invalidValues = [null, void 0, "079777681629"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsEAN)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isEAN)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isEAN)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isEAN";
    const message = "someProperty must be an EAN (European Article Number)";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsISRC", () => {
  const constraint = "";
  const validValues = ["GBAYE6800011"];
  const invalidValues = [null, void 0, "SRC15705223"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISRC)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isISRC)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isISRC)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isISRC";
    const message = "someProperty must be an ISRC";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsRFC3339", () => {
  const constraint = "";
  const validValues = ["2010-02-18t00:23:23.33+06:00"];
  const invalidValues = [null, void 0, "2009-05-31 14:60:55Z"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsRFC3339)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isRFC3339)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isRFC3339)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isRFC3339";
    const message = "someProperty must be RFC 3339 date";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsLocale", () => {
  const constraint = "";
  const validValues = ["en_US_POSIX"];
  const invalidValues = [null, void 0, "lo_POP"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsLocale)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isLocale)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isLocale)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isLocale";
    const message = "someProperty must be locale";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsMagnetURI", () => {
  const constraint = "";
  const validValues = ["magnet:?xt=urn:btih:1GSHJVBDVDVJFYEHKFHEFIO8573898434JBFEGHD&dn=foo&tr=udp://foo.com:1337"];
  const invalidValues = [
    null,
    void 0,
    "magnet:?xt=uarn:btih:MCJDCYUFHEUD6E2752T7UJNEKHSUGEJFGTFHVBJS&dn=bar&tr=udp://bar.com:1337"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsMagnetURI)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isMagnetURI)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isMagnetURI)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isMagnetURI";
    const message = "someProperty must be magnet uri format";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsMimeType", () => {
  const constraint = "";
  const validValues = ["multipart/form-data; boundary=something; charset=utf-8"];
  const invalidValues = [null, void 0, "font/woff2; charset=utf-8"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsMimeType)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isMimeType)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isMimeType)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isMimeType";
    const message = "someProperty must be MIME type format";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsOctal", () => {
  const constraint = "";
  const validValues = ["0o01234567"];
  const invalidValues = [null, void 0, "00c12345670c"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsOctal)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isOctal)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isOctal)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isOctal";
    const message = "someProperty must be valid octal number";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsPassportNumber", () => {
  const constraint = "DE";
  const validValues = ["C26VMVVC3"];
  const invalidValues = [null, void 0, "AS0123456"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsPassportNumber)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isPassportNumber)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isPassportNumber)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isPassportNumber";
    const message = "someProperty must be valid passport number";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsPostalCode", () => {
  const constraint = "BR";
  const validValues = ["39100-000"];
  const invalidValues = [null, void 0, "13165-00"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsPostalCode)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isPostalCode)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isPostalCode)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isPostalCode";
    const message = "someProperty must be a postal code";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsSemVer", () => {
  const constraint = "";
  const validValues = ["1.1.2+meta-valid"];
  const invalidValues = [null, void 0, "1.0.0-alpha_beta"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsSemVer)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isSemVer)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isSemVer)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isSemVer";
    const message = "someProperty must be a Semantic Versioning Specification";
    checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsByteLength", () => {
  const constraint1 = 2;
  const constraint2 = 20;
  const validValues = ["hellostring"];
  const invalidValues = [null, void 0, "helloveryveryveryverylongstring"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsByteLength)(constraint1, constraint2)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isByteLength)(value, constraint1, constraint2)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isByteLength)(value, constraint1, constraint2)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isByteLength";
    const message = "someProperty's byte length must fall into (" + (0, import_ValidationUtils.constraintToString)(constraint1) + ", " + (0, import_ValidationUtils.constraintToString)(constraint2) + ") range";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsCreditCard", () => {
  const validValues = [
    "375556917985515",
    "36050234196908",
    "4716461583322103",
    "4716-2210-5188-5662",
    "4929 7226 5379 7141",
    "5398228707871527"
  ];
  const invalidValues = [null, void 0, "foo", "foo", "5398228707871528"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsCreditCard)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isCreditCard)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isCreditCard)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isCreditCard";
    const message = "someProperty must be a credit card";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsCurrency", () => {
  const validValues = [
    "-$10,123.45",
    "$10,123.45",
    "$10123.45",
    "10,123.45",
    "10123.45",
    "10,123",
    "1,123,456",
    "1123456",
    "1.39",
    ".03",
    "0.10",
    "$0.10",
    "-$0.01",
    "-$.99",
    "$100,234,567.89",
    "$10,123",
    "10,123",
    "-10123"
  ];
  const invalidValues = [
    null,
    void 0,
    "1.234",
    "$1.1",
    "$ 32.50",
    "500$",
    ".0001",
    "$.001",
    "$0.001",
    "12,34.56",
    "123456,123,123456",
    "123,4",
    ",123",
    "$-,123",
    "$",
    ".",
    ",",
    "00",
    "$-",
    "$-,.",
    "-",
    "-$",
    "",
    "- $"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsCurrency)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isCurrency)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isCurrency)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isCurrency";
    const message = "someProperty must be a currency";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsEmail", () => {
  const validValues = [
    "foo@bar.com",
    "x@x.au",
    "foo@bar.com.au",
    "foo+bar@bar.com",
    "hans.m\u7AEFller@test.com",
    "hans@m\u7AEFller.com",
    "test|123@m\u7AEFller.com",
    '"foobar"@example.com',
    '"  foo  m\u7AEFller "@example.com',
    '"foo\\@bar"@example.com'
  ];
  const invalidValues = [
    null,
    void 0,
    "invalidemail@",
    "invalid.com",
    "@invalid.com",
    "foo@bar.com.",
    "somename@\uFF47\uFF4D\uFF41\uFF49\uFF4C.com",
    "foo@bar.co.uk.",
    "z@co.c",
    "gmail...ignores...dots...@gmail.com",
    "\uFF47\uFF4D\uFF41\uFF49\uFF4C\uFF47\uFF4D\uFF41\uFF49\uFF4C\uFF47\uFF4D\uFF41\uFF49\uFF4C\uFF47\uFF4D\uFF41\uFF49\uFF4C\uFF47\uFF4D\uFF41\uFF49\uFF4C@gmail.com"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsEmail)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => {
      expect((0, import_decorators.isEmail)(value)).toBeTruthy();
    });
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isEmail)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isEmail";
    const message = "someProperty must be an email";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsFQDN", () => {
  const validValues = [
    "domain.com",
    "dom.plato",
    "a.domain.co",
    "foo--bar.com",
    "xn--froschgrn-x9a.com",
    "rebecca.blackfriday"
  ];
  const invalidValues = [
    null,
    void 0,
    "abc",
    "256.0.0.0",
    "_.com",
    "*.some.com",
    "s!ome.com",
    "domain.com/",
    "/more.com"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsFQDN)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isFQDN)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isFQDN)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isFqdn";
    const message = "someProperty must be a valid domain name";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsFullWidth", () => {
  const validValues = ["\u3072\u3089\u304C\u306A\u30FB\u30AB\u30BF\u30AB\u30CA\u3001\uFF0E\u6F22\u5B57", "\uFF13\u30FC\uFF10\u3000\uFF41\uFF20\uFF43\uFF4F\uFF4D", "\uFF26\uFF76\uFF80\uFF76\uFF85\uFF9E\uFFAC", "Good\uFF1DParts"];
  const invalidValues = [null, void 0, "abc", "abc123"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsFullWidth)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isFullWidth)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isFullWidth)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isFullWidth";
    const message = "someProperty must contain a full-width characters";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsHalfWidth", () => {
  const validValues = ["l-btn_02--active", "abc123\u3044", "\uFF76\uFF80\uFF76\uFF85\uFF9E\uFFAC\uFFE9"];
  const invalidValues = [null, void 0, "\u3042\u3044\u3046\u3048\u304A", "\uFF10\uFF10\uFF11\uFF11"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsHalfWidth)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isHalfWidth)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isHalfWidth)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isHalfWidth";
    const message = "someProperty must contain a half-width characters";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsVariableWidth", () => {
  const validValues = ["\u3072\u3089\u304C\u306A\u30AB\u30BF\u30AB\u30CA\u6F22\u5B57ABCDE", "\uFF13\u30FC\uFF10123", "\uFF26\uFF76\uFF80\uFF76\uFF85\uFF9E\uFFAC", "Good\uFF1DParts"];
  const invalidValues = [
    null,
    void 0,
    "abc",
    "abc123",
    '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
    "\u3072\u3089\u304C\u306A\u30FB\u30AB\u30BF\u30AB\u30CA\u3001\uFF0E\u6F22\u5B57",
    "\uFF11\uFF12\uFF13\uFF14\uFF15\uFF16",
    "\uFF76\uFF80\uFF76\uFF85\uFF9E\uFFAC"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsVariableWidth)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isVariableWidth)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isVariableWidth)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isVariableWidth";
    const message = "someProperty must contain a full-width and half-width characters";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsHexColor", () => {
  const validValues = ["#ff0034", "#CCCCCC", "fff", "#f00"];
  const invalidValues = [null, void 0, "#ff", "#xxxx", "#ff12FG"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsHexColor)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isHexColor)(value)).toBeFalsy());
  });
  it("should fail if method in validator said that its invalid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isHexColor)(value)).toBeTruthy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isHexColor";
    const message = "someProperty must be a hexadecimal color";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsHexadecimal", () => {
  const validValues = ["deadBEEF", "ff0044"];
  const invalidValues = [null, void 0, "abcdefg", "", ".."];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsHexadecimal)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isHexadecimal)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isHexadecimal)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isHexadecimal";
    const message = "someProperty must be a hexadecimal number";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsMACAddress", () => {
  const validValues = ["ab:ab:ab:ab:ab:ab", "FF:FF:FF:FF:FF:FF", "01:02:03:04:05:ab", "01:AB:03:04:05:06"];
  const invalidValues = [
    null,
    void 0,
    "abc",
    "01:02:03:04:05",
    "01:02:03:04::ab",
    "1:2:3:4:5:6",
    "AB:CD:EF:GH:01:02",
    "A9C5 D4 9F EB D3",
    "01-02 03:04 05 ab"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsMACAddress)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isMACAddress)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isMACAddress)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isMacAddress";
    const message = "someProperty must be a MAC Address";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsIP", () => {
  const validValues = [
    "127.0.0.1",
    "0.0.0.0",
    "255.255.255.255",
    "1.2.3.4",
    "::1",
    "2001:db8:0000:1:1:1:1:1",
    "2001:41d0:2:a141::1",
    "::ffff:127.0.0.1",
    "::0000",
    "0000::",
    "1::",
    "1111:1:1:1:1:1:1:1",
    "fe80::a6db:30ff:fe98:e946",
    "::",
    "::ffff:127.0.0.1",
    "0:0:0:0:0:ffff:127.0.0.1"
  ];
  const invalidValues = [
    null,
    void 0,
    "abc",
    "256.0.0.0",
    "0.0.0.256",
    "26.0.0.256",
    "::banana",
    "banana::",
    "::1banana",
    "::1::",
    "1:",
    ":1",
    ":1:1:1::2",
    "1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1",
    "::11111",
    "11111:1:1:1:1:1:1:1",
    "2001:db8:0000:1:1:1:1::1",
    "0:0:0:0:0:0:ffff:127.0.0.1",
    "0:0:0:0:ffff:127.0.0.1"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsIP)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isIP)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isIP)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIp";
    const message = "someProperty must be an ip address";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsISBN version 10", () => {
  const validValues = [
    "3836221195",
    "3-8362-2119-5",
    "3 8362 2119 5",
    "1617290858",
    "1-61729-085-8",
    "1 61729 085-8",
    "0007269706",
    "0-00-726970-6",
    "0 00 726970 6",
    "3423214120",
    "3-423-21412-0",
    "3 423 21412 0",
    "340101319X",
    "3-401-01319-X",
    "3 401 01319 X"
  ];
  const invalidValues = [
    null,
    void 0,
    "3423214121",
    "3-423-21412-1",
    "3 423 21412 1",
    "978-3836221191",
    "9783836221191",
    "123456789a",
    "foo"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISBN)(10)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isISBN)(value, "10")).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isISBN)(value, "10")).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIsbn";
    const message = "someProperty must be an ISBN";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsISBN version 13", () => {
  const validValues = [
    "9783836221191",
    "978-3-8362-2119-1",
    "978 3 8362 2119 1",
    "9783401013190",
    "978-3401013190",
    "978 3401013190",
    "9784873113685",
    "978-4-87311-368-5",
    "978 4 87311 368 5"
  ];
  const invalidValues = [
    null,
    void 0,
    "9783836221190",
    "978-3-8362-2119-0",
    "978 3 8362 2119 0",
    "3836221195",
    "3-8362-2119-5",
    "3 8362 2119 5",
    "01234567890ab",
    "foo",
    ""
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISBN)(13)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isISBN)(value, "13")).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isISBN)(value, "13")).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIsbn";
    const message = "someProperty must be an ISBN";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsISO8601", () => {
  const validValues = [
    "2009-12T12:34",
    "2009",
    "2009-05-19",
    "2009-05-19",
    "20090519",
    "2009123",
    "2009-05",
    "2009-123",
    "2009-222",
    "2009-001",
    "2009-W01-1",
    "2009-W51-1",
    "2009-W511",
    "2009-W33",
    "2009W511",
    "2009-05-19",
    "2009-05-19 00:00",
    "2009-05-19 14",
    "2009-05-19 14:31",
    "2009-05-19 14:39:22",
    "2009-05-19T14:39Z",
    "2009-W21-2",
    "2009-W21-2T01:22",
    "2009-139",
    "2009-05-19 14:39:22-06:00",
    "2009-05-19 14:39:22+0600",
    "2009-05-19 14:39:22-01",
    "20090621T0545Z",
    "2007-04-06T00:00",
    "2007-04-05T24:00",
    "2010-02-18T16:23:48.5",
    "2010-02-18T16:23:48,444",
    "2010-02-18T16:23:48,3-06:00",
    "2010-02-18T16:23.4",
    "2010-02-18T16:23,25",
    "2010-02-18T16:23.33+0600",
    "2010-02-18T16.23334444",
    "2010-02-18T16,2283",
    "2009-05-19 143922.500",
    "2009-05-19 1439,55"
  ];
  const invalidValues = [
    null,
    void 0,
    "200905",
    "2009367",
    "2009-",
    "2007-04-05T24:50",
    "2009-000",
    "2009-M511",
    "2009M511",
    "2009-05-19T14a39r",
    "2009-05-19T14:3924",
    "2009-0519",
    "2009-05-1914:39",
    "2009-05-19 14:",
    "2009-05-19r14:39",
    "2009-05-19 14a39a22",
    "200912-01",
    "2009-05-19 14:39:22+06a00",
    "2009-05-19 146922.500",
    "2010-02-18T16.5:23.35:48",
    "2010-02-18T16:23.35:48",
    "2010-02-18T16:23.35:48.45",
    "2009-05-19 14.5.44",
    "2010-02-18T16:23.33.600",
    "2010-02-18T16,25:23:48,444"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISO8601)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isISO8601)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isISO8601)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isIso8601";
    const message = "someProperty must be a valid ISO 8601 date string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsJSON", () => {
  const validValues = ['{ "key": "value" }', "{}"];
  const invalidValues = [null, void 0, '{ key: "value" }', "{ 'key': 'value' }", "null", "1234", "false", '"nope"'];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsJSON)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isJSON)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isJSON)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isJson";
    const message = "someProperty must be a json string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsJWT", () => {
  const validValues = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb3JlbSI6Imlwc3VtIn0.ymiJSsMJXR6tMSr8G9usjQ15_8hKPDv_CArLhxw28MI",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2xvciI6InNpdCIsImFtZXQiOlsibG9yZW0iLCJpcHN1bSJdfQ.rRpe04zbWbbJjwM43VnHzAboDzszJtGrNsUxaqQ-GQ8",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
  ];
  const invalidValues = ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "$Zs.ewu.su84", "ks64$S/9.dy$\xA7kz.3sd73b"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsJWT)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isJWT)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isJWT)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isJwt";
    const message = "someProperty must be a jwt string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsObject", () => {
  const validValues = [{ key: "value" }, { key: "value" }, {}];
  const invalidValues = [
    null,
    void 0,
    '{ key: "value" }',
    "{ 'key': 'value' }",
    "string",
    1234,
    false,
    "[]",
    [],
    [{ key: "value" }]
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsObject)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isObject)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isObject)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isObject";
    const message = "someProperty must be an object";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsNotEmptyObject", () => {
  const validValues = [{ key: "value" }, { key: "value" }, { key: void 0 }, { key: null }];
  const invalidValues = [
    null,
    void 0,
    '{ key: "value" }',
    "{ 'key': 'value' }",
    "string",
    1234,
    false,
    {},
    [],
    [{ key: "value" }]
  ];
  const nullableValidValues = [{ key: "value" }, { key: "value" }];
  const nullableInvalidValues = [
    null,
    void 0,
    '{ key: "value" }',
    "{ 'key': 'value' }",
    "string",
    1234,
    false,
    {},
    { key: void 0 },
    { key: null },
    [],
    [{ key: "value" }]
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNotEmptyObject)()
  ], MyClass.prototype, "someProperty", 2);
  class NullableMyClass {
  }
  __decorateClass([
    (0, import_decorators.IsNotEmptyObject)({ nullable: true })
  ], NullableMyClass.prototype, "someProperty", 2);
  it.each([
    [new MyClass(), validValues],
    [new NullableMyClass(), nullableValidValues]
  ])("should not fail if validator.validate said that its valid", (validationObject, values) => {
    return checkValidValues(validationObject, values);
  });
  it.each([
    [new MyClass(), invalidValues],
    [new NullableMyClass(), nullableInvalidValues]
  ])("should fail if validator.validate said that its invalid", (validationObject, values) => {
    return checkInvalidValues(validationObject, values);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isNotEmptyObject)(value)).toBeTruthy());
    nullableValidValues.forEach((value) => expect((0, import_decorators.isNotEmptyObject)(value, { nullable: true })).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isNotEmptyObject)(value)).toBeFalsy());
    nullableInvalidValues.forEach((value) => expect((0, import_decorators.isNotEmptyObject)(value, { nullable: true })).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isNotEmptyObject";
    const message = "someProperty must be a non-empty object";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsLowercase", () => {
  const validValues = ["abc", "abc123", "this is lowercase.", "tr\u7AEAs \u7AEFber"];
  const invalidValues = [null, void 0, "fooBar", "123A"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsLowercase)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isLowercase)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isLowercase)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isLowercase";
    const message = "someProperty must be a lowercase string";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsMongoId", () => {
  const validValues = ["507f1f77bcf86cd799439011"];
  const invalidValues = [
    null,
    void 0,
    "507f1f77bcf86cd7994390",
    "507f1f77bcf86cd79943901z",
    "",
    "507f1f77bcf86cd799439011 "
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsMongoId)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isMongoId)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isMongoId)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isMongoId";
    const message = "someProperty must be a mongodb id";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsMultibyte", () => {
  const validValues = [
    "\u3072\u3089\u304C\u306A\u30FB\u30AB\u30BF\u30AB\u30CA\u3001\uFF0E\u6F22\u5B57",
    "\u3042\u3044\u3046\u3048\u304A foobar",
    "test\uFF20example.com",
    "1234abcDE\uFF58\uFF59\uFF5A",
    "\uFF76\uFF80\uFF76\uFF85",
    "\u4E2D\u6587"
  ];
  const invalidValues = [null, void 0, "abc", "abc123", '<>@" *.'];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsMultibyte)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isMultibyte)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isMultibyte)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isMultibyte";
    const message = "someProperty must contain one or more multibyte chars";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsSurrogatePair", () => {
  const validValues = ["\u{20BB7}\u91CE\u{20BB7}", "\u{29E3D}", "ABC\u5343\u{259C4}1-2-3"];
  const invalidValues = [null, void 0, "\u5409\u91CE\u7AC8", "\u9BAA", "ABC1-2-3"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsSurrogatePair)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isSurrogatePair)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isSurrogatePair)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isSurrogatePair";
    const message = "someProperty must contain any surrogate pairs chars";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsUrl", () => {
  const validValues = [
    "foobar.com",
    "www.foobar.com",
    "foobar.com/",
    "valid.au",
    "http://www.foobar.com/",
    "http://www.foobar.com:23/",
    "http://www.foobar.com:65535/",
    "http://www.foobar.com:5/",
    "https://www.foobar.com/",
    "ftp://www.foobar.com/",
    "http://www.foobar.com/~foobar",
    "http://user:pass@www.foobar.com/",
    "http://user:@www.foobar.com/",
    "http://127.0.0.1/",
    "http://10.0.0.0/",
    "http://189.123.14.13/",
    "http://duckduckgo.com/?q=%2F",
    'http://foobar.com/t$-_.+!*"(),',
    "http://foobar.com/?foo=bar#baz=qux",
    "http://foobar.com?foo=bar",
    "http://foobar.com#baz=qux",
    "http://www.xn--froschgrn-x9a.net/",
    "http://xn--froschgrn-x9a.com/",
    "http://foo--bar.com",
    "http://h\xF8yfjellet.no",
    "http://xn--j1aac5a4g.xn--j1amh"
  ];
  const invalidValues = [
    null,
    void 0,
    "xyz://foobar.com",
    "invalid/",
    "invalid.x",
    "invalid.",
    ".com",
    "http://com/",
    "http://300.0.0.1/",
    "mailto:foo@bar.com",
    "rtmp://foobar.com",
    "http://www.xn--.com/",
    "http://xn--.com/",
    "http://www.foobar.com:0/",
    "http://www.foobar.com:70000/",
    "http://www.foobar.com:99999/",
    "http://www.-foobar.com/",
    "http://www.foobar-.com/",
    "http://foobar/# lol",
    "http://foobar/? lol",
    "http://foobar/ lol/",
    "http://lol @foobar.com/",
    "http://lol:lol @foobar.com/",
    "http://lol:lol:lol@foobar.com/",
    "http://lol: @foobar.com/",
    "http://www.foo_bar.com/",
    "http://www.foobar.com/	",
    "http://\n@www.foobar.com/",
    "",
    "http://localhost:61500this is an invalid url!!!!",
    "http://foobar.com/" + new Array(2083).join("f"),
    "http://*.foo.com",
    "*.foo.com",
    "!.foo.com",
    "http://example.com.",
    "////foobar.com",
    "http:////foobar.com"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsUrl)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isURL)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isURL)(value)).toBeFalsy());
  });
  it("should fail on localhost without require_tld option", () => {
    expect((0, import_decorators.isURL)("http://localhost:3000/")).toBeFalsy();
  });
  it("should pass on localhost with require_tld option", () => {
    expect((0, import_decorators.isURL)("http://localhost:3000/", { require_tld: false })).toBeTruthy();
  });
  it("should return error object with proper data", () => {
    const validationType = "isUrl";
    const message = "someProperty must be an URL address";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsUUID", () => {
  const validValues = [
    "A987FBC9-4BED-3078-CF07-9141BA07C9F3",
    "A987FBC9-4BED-4078-8F07-9141BA07C9F3",
    "A987FBC9-4BED-5078-AF07-9141BA07C9F3"
  ];
  const invalidValues = [
    null,
    void 0,
    "",
    "xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3",
    "A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx",
    "A987FBC94BED3078CF079141BA07C9F3",
    "934859",
    "987FBC9-4BED-3078-CF07A-9141BA07C9F3",
    "AAAAAAAA-1111-1111-AAAG-111111111111"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsUUID)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isUUID)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isUUID)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isUuid";
    const message = "someProperty must be a UUID";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsUUID v3", () => {
  const validValues = ["A987FBC9-4BED-3078-CF07-9141BA07C9F3"];
  const invalidValues = [
    null,
    void 0,
    "",
    "xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3",
    "934859",
    "AAAAAAAA-1111-1111-AAAG-111111111111",
    "A987FBC9-4BED-4078-8F07-9141BA07C9F3",
    "A987FBC9-4BED-5078-AF07-9141BA07C9F3"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsUUID)("3")
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isUUID)(value, "3")).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isUUID)(value, "3")).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isUuid";
    const message = "someProperty must be a UUID";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsUUID v4", () => {
  const validValues = [
    "713ae7e3-cb32-45f9-adcb-7c4fa86b90c1",
    "625e63f3-58f5-40b7-83a1-a72ad31acffb",
    "57b73598-8764-4ad0-a76a-679bb6640eb1",
    "9c858901-8a57-4791-81fe-4c455b099bc9"
  ];
  const invalidValues = [
    null,
    void 0,
    "",
    "xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3",
    "934859",
    "AAAAAAAA-1111-1111-AAAG-111111111111",
    "A987FBC9-4BED-5078-AF07-9141BA07C9F3",
    "A987FBC9-4BED-3078-CF07-9141BA07C9F3"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsUUID)("4")
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isUUID)(value, "4")).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isUUID)(value, "4")).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isUuid";
    const message = "someProperty must be a UUID";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsUUID v5", () => {
  const validValues = [
    "987FBC97-4BED-5078-AF07-9141BA07C9F3",
    "987FBC97-4BED-5078-BF07-9141BA07C9F3",
    "987FBC97-4BED-5078-8F07-9141BA07C9F3",
    "987FBC97-4BED-5078-9F07-9141BA07C9F3"
  ];
  const invalidValues = [
    null,
    void 0,
    "",
    "xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3",
    "934859",
    "AAAAAAAA-1111-1111-AAAG-111111111111",
    "9c858901-8a57-4791-81fe-4c455b099bc9",
    "A987FBC9-4BED-3078-CF07-9141BA07C9F3"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsUUID)("5")
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isUUID)(value, "5")).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isUUID)(value, "5")).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isUuid";
    const message = "someProperty must be a UUID";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsFirebasePushId", () => {
  const validValues = [
    "-M-Jh_1KAH5rYJF_7-kY",
    "-M1yvu7FKe87rR_62NH7",
    "-M1jVySxQQPktYyXA2qE",
    "-JhLeOlGIEjaIOFHR0xd",
    "-JhQ76OEK_848CkIFhAq",
    "-JhQ7APk0UtyRTFO9-TS"
  ];
  const invalidValues = [
    null,
    void 0,
    true,
    false,
    "",
    "5584fa9e-6146-497a-85c9-dbb459ef7b74",
    "Steve",
    "dbfa63ea-2c1f-4cf8-b6b9-192b070b558c"
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsFirebasePushId)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isFirebasePushId)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isFirebasePushId)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "IsFirebasePushId";
    const message = "someProperty must be a Firebase Push Id";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsUppercase", () => {
  const validValues = ["ABC", "ABC123", "ALL CAPS IS FUN.", "   ."];
  const invalidValues = [null, void 0, "fooBar", "123abc"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsUppercase)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isUppercase)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isUppercase)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isUppercase";
    const message = "someProperty must be uppercase";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Length", () => {
  const constraint1 = 2;
  const constraint2 = 3;
  const validValues = ["abc", "de"];
  const invalidValues = [null, void 0, "", "a", "abcd"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Length)(constraint1, constraint2)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.length)(value, constraint1, constraint2)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.length)(value, constraint1, constraint2)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "length";
    const message = "someProperty must be longer than or equal to " + (0, import_ValidationUtils.constraintToString)(constraint1) + " characters";
    checkReturnedError(new MyClass(), ["", "a"], validationType, message);
  });
  it("should return error object with proper data", () => {
    const validationType = "length";
    const message = "someProperty must be shorter than or equal to " + (0, import_ValidationUtils.constraintToString)(constraint2) + " characters";
    checkReturnedError(new MyClass(), ["aaaa", "azzazza"], validationType, message);
  });
});
describe("MinLength", () => {
  const constraint1 = 10;
  const validValues = ["helloworld", "hello how are you"];
  const invalidValues = [null, void 0, "hellowar", "howareyou"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.MinLength)(constraint1)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.minLength)(value, constraint1)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.minLength)(value, constraint1)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "minLength";
    const message = "someProperty must be longer than or equal to " + (0, import_ValidationUtils.constraintToString)(constraint1) + " characters";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("MaxLength", () => {
  const constraint1 = 10;
  const validValues = ["hellowar", "howareyou", "helloworld"];
  const invalidValues = [null, void 0, "helloworld!", "hello how are you"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.MaxLength)(constraint1)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.maxLength)(value, constraint1)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.maxLength)(value, constraint1)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "maxLength";
    const message = "someProperty must be shorter than or equal to " + (0, import_ValidationUtils.constraintToString)(constraint1) + " characters";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Matches pattern RegExp", () => {
  const constraint = /abc/;
  const validValues = ["abc", "abcdef", "123abc"];
  const invalidValues = [null, void 0, "acb", "Abc"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Matches)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.matches)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.matches)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "matches";
    const message = "someProperty must match " + (0, import_ValidationUtils.constraintToString)(constraint) + " regular expression";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("Matches pattern string with modifier", () => {
  const constraint = "abc";
  const modifier = "i";
  const validValues = ["abc", "abcdef", "123abc", "AbC"];
  const invalidValues = [null, void 0, "acb"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.Matches)(constraint, modifier)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.matches)(value, constraint, modifier)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.matches)(value, constraint, modifier)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "matches";
    const message = "someProperty must match " + (0, import_ValidationUtils.constraintToString)(constraint) + " regular expression";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsMilitaryTime", () => {
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsMilitaryTime)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail for a valid time in the format HH:MM", () => {
    const validValues = ["10:22", "12:03", "16:32", "23:59", "00:00"];
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail for invalid time format", () => {
    const invalidValues = ["23:61", "25:00", "08:08 pm", "04:00am"];
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should fail for invalid values", () => {
    const invalidValues = [void 0, null, "23:00 and invalid counterpart"];
    return checkInvalidValues(new MyClass(), invalidValues);
  });
});
describe("isPhoneNumber", () => {
  describe("with region", () => {
    const validValues = [
      "0311111111",
      "031 633 60 01",
      "079 4 666 666",
      "075 416 20 30",
      "+41 311111111",
      "+41 31 633 60 01",
      "+41 79 4 666 666",
      "+41 75 416 20 30",
      "+41 (0)311111111",
      "+41 (0)31 633 60 01",
      "+41 (0)79 4 666 666",
      "+41 (0)75 416 20 30",
      "+49 9072 1111"
    ];
    const invalidValues = [void 0, null, "asdf", "1"];
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.IsPhoneNumber)("CH")
    ], MyClass.prototype, "someProperty", 2);
    it("should not fail if validator.validate said that its valid", () => {
      return checkValidValues(new MyClass(), validValues);
    });
    it("should fail if validator.validate said that its invalid", () => {
      return checkInvalidValues(new MyClass(), invalidValues);
    });
  });
  describe("no region", () => {
    const validValues = [
      "+41 311111111",
      "+41 31 633 60 01",
      "+41 79 4 666 666",
      "+41 75 416 20 30",
      "+41 (0)311111111",
      "+41 (0)31 633 60 01",
      "+41 (0)79 4 666 666",
      "+41 (0)75 416 20 30",
      "+49 9072 1111"
    ];
    const invalidValues = [
      "0311111111",
      "031 633 60 01",
      "079 4 666 666",
      "075 416 20 30",
      void 0,
      null,
      "asdf",
      "1"
    ];
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.IsPhoneNumber)(null)
    ], MyClass.prototype, "someProperty", 2);
    it("should not fail if validator.validate said that its valid", () => {
      return checkValidValues(new MyClass(), validValues);
    });
    it("should fail if validator.validate said that its invalid", () => {
      return checkInvalidValues(new MyClass(), invalidValues);
    });
  });
});
describe("IsISO31661Alpha2", () => {
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISO31661Alpha2)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail for a valid ISO31661 Alpha2 code", () => {
    const validValues = ["AD", "AE", "AF", "AG"];
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail for invalid values", () => {
    const invalidValues = [void 0, null, "", "AFR"];
    return checkInvalidValues(new MyClass(), invalidValues);
  });
});
describe("IsISO31661Alpha3", () => {
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISO31661Alpha3)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail for a valid ISO31661 Alpha3 code", () => {
    const validValues = ["ABW", "HND", "KHM", "RWA"];
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail for invalid values", () => {
    const invalidValues = [void 0, null, "", "FR", "fR", "GB", "PT", "CM", "JP", "PM", "ZW"];
    return checkInvalidValues(new MyClass(), invalidValues);
  });
});
describe("isHash", () => {
  function testHash(algorithm, validValues, invalidValues) {
    class MyClass {
    }
    __decorateClass([
      (0, import_decorators.IsHash)(algorithm)
    ], MyClass.prototype, "someProperty", 2);
    it("should not fail if validator.validate said that its valid", () => {
      return checkValidValues(new MyClass(), validValues);
    });
    it("should fail if validator.validate said that its invalid", () => {
      return checkInvalidValues(new MyClass(), invalidValues);
    });
    it("should not fail if method in validator said that its valid", () => {
      validValues.forEach((value) => expect((0, import_decorators.isHash)(value, algorithm)).toBeTruthy());
    });
    it("should fail if method in validator said that its invalid", () => {
      invalidValues.forEach((value) => expect((0, import_decorators.isHash)(value, algorithm)).toBeFalsy());
    });
    it("should return error object with proper data", () => {
      const validationType = "isHash";
      const message = `someProperty must be a hash of type ${algorithm}`;
      return checkReturnedError(new MyClass(), invalidValues, validationType, message);
    });
  }
  for (const algorithm of ["md5", "md4", "ripemd128", "tiger128"]) {
    const validValues = [
      "d94f3f016ae679c3008de268209132f2",
      "751adbc511ccbe8edf23d486fa4581cd",
      "88dae00e614d8f24cfd5a8b3f8002e93",
      "0bf1c35032a71a14c2f719e5a14c1e96"
    ];
    const invalidValues = [
      void 0,
      null,
      "q94375dj93458w34",
      "39485729348",
      "%&FHKJFvk",
      "KYT0bf1c35032a71a14c2f719e5a1"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
  for (const algorithm of ["crc32", "crc32b"]) {
    const validValues = ["d94f3f01", "751adbc5", "88dae00e", "0bf1c350"];
    const invalidValues = [
      void 0,
      null,
      "KYT0bf1c35032a71a14c2f719e5a14c1",
      "q94375dj93458w34",
      "q943",
      "39485729348",
      "%&FHKJFvk"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
  for (const algorithm of ["sha1", "tiger160", "ripemd160"]) {
    const validValues = [
      "3ca25ae354e192b26879f651a51d92aa8a34d8d3",
      "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
      "beb8c3f30da46be179b8df5f5ecb5e4b10508230",
      "efd5d3b190e893ed317f38da2420d63b7ae0d5ed"
    ];
    const invalidValues = [
      void 0,
      null,
      "KYT0bf1c35032a71a14c2f719e5a14c1",
      "KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk",
      "q94375dj93458w34",
      "39485729348",
      "%&FHKJFvk"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
  for (const algorithm of ["sha256"]) {
    const validValues = [
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      "1d996e033d612d9af2b44b70061ee0e868bfd14c2dd90b129e1edeb7953e7985",
      "80f70bfeaed5886e33536bcfa8c05c60afef5a0e48f699a7912d5e399cdcc441",
      "579282cfb65ca1f109b78536effaf621b853c9f7079664a3fbe2b519f435898c"
    ];
    const invalidValues = [
      void 0,
      null,
      "KYT0bf1c35032a71a14c2f719e5a14c1",
      "KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk",
      "q94375dj93458w34",
      "39485729348",
      "%&FHKJFvk"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
  for (const algorithm of ["sha384"]) {
    const validValues = [
      "3fed1f814d28dc5d63e313f8a601ecc4836d1662a19365cbdcf6870f6b56388850b58043f7ebf2418abb8f39c3a42e31",
      "b330f4e575db6e73500bd3b805db1a84b5a034e5d21f0041d91eec85af1dfcb13e40bb1c4d36a72487e048ac6af74b58",
      "bf547c3fc5841a377eb1519c2890344dbab15c40ae4150b4b34443d2212e5b04aa9d58865bf03d8ae27840fef430b891",
      "fc09a3d11368386530f985dacddd026ae1e44e0e297c805c3429d50744e6237eb4417c20ffca8807b071823af13a3f65"
    ];
    const invalidValues = [
      void 0,
      null,
      "KYT0bf1c35032a71a14c2f719e5a14c1",
      "KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk",
      "q94375dj93458w34",
      "39485729348",
      "%&FHKJFvk"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
  for (const algorithm of ["sha512"]) {
    const validValues = [
      "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043",
      "83c586381bf5ba94c8d9ba8b6b92beb0997d76c257708742a6c26d1b7cbb9269af92d527419d5b8475f2bb6686d2f92a6649b7f174c1d8306eb335e585ab5049",
      "45bc5fa8cb45ee408c04b6269e9f1e1c17090c5ce26ffeeda2af097735b29953ce547e40ff3ad0d120e5361cc5f9cee35ea91ecd4077f3f589b4d439168f91b9",
      "432ac3d29e4f18c7f604f7c3c96369a6c5c61fc09bf77880548239baffd61636d42ed374f41c261e424d20d98e320e812a6d52865be059745fdb2cb20acff0ab"
    ];
    const invalidValues = [
      void 0,
      null,
      "KYT0bf1c35032a71a14c2f719e5a14c1",
      "KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk",
      "q94375dj93458w34",
      "39485729348",
      "%&FHKJFvk"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
  for (const algorithm of ["tiger192"]) {
    const validValues = [
      "6281a1f098c5e7290927ed09150d43ff3990a0fe1a48267c",
      "56268f7bc269cf1bc83d3ce42e07a85632394737918f4760",
      "46fc0125a148788a3ac1d649566fc04eb84a746f1a6e4fa7",
      "7731ea1621ae99ea3197b94583d034fdbaa4dce31a67404a"
    ];
    const invalidValues = [
      void 0,
      null,
      "KYT0bf1c35032a71a14c2f719e5a14c1",
      "KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk",
      "q94375dj93458w34",
      "39485729348",
      "%&FHKJFvk"
    ];
    testHash(algorithm, validValues, invalidValues);
  }
});
describe("IsISSN", () => {
  const validValues = ["0378-5955", "0000-0000", "2434-561X", "2434-561x", "01896016", "20905076"];
  const invalidValues = [
    null,
    void 0,
    "0378-5954",
    "0000-0001",
    "0378-123",
    "037-1234",
    "0",
    "2434-561c",
    "1684-5370",
    "19960791",
    ""
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISSN)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isISSN)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isISSN)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isISSN";
    const message = "someProperty must be a ISSN";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("IsISSN with options", () => {
  const options = { case_sensitive: true, require_hyphen: true };
  const validValues = ["2434-561X", "0378-5955"];
  const invalidValues = [null, void 0, "2434-561x", "2434561X", "2434561x", "03785955"];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsISSN)(options)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isISSN)(value, options)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isISSN)(value, options)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isISSN";
    const message = "someProperty must be a ISSN";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayContains", () => {
  const constraint = ["superman"];
  const validValues = [
    ["world", "hello", "superman"],
    ["world", "superman", "hello"],
    ["superman", "world", "hello"]
  ];
  const invalidValues = [null, void 0, ["world", "hello"]];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayContains)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayContains)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayContains)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayContains";
    const message = "someProperty must contain " + (0, import_ValidationUtils.constraintToString)(constraint) + " values";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayNotContains", () => {
  const constraint = ["superman"];
  const validValues = [["world", "hello"]];
  const invalidValues = [
    null,
    void 0,
    ["world", "hello", "superman"],
    ["world", "superman", "hello"],
    ["superman", "world", "hello"]
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayNotContains)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayNotContains)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayNotContains)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayNotContains";
    const message = "someProperty should not contain " + (0, import_ValidationUtils.constraintToString)(constraint) + " values";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayNotEmpty", () => {
  const validValues = [
    [0],
    [""],
    [null],
    [void 0],
    [false],
    ["world", "hello", "superman"],
    ["world", "superman", "hello"],
    ["superman", "world", "hello"]
  ];
  const invalidValues = [null, void 0, []];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayNotEmpty)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayNotEmpty)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayNotEmpty)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayNotEmpty";
    const message = "someProperty should not be empty";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayMinSize", () => {
  const constraint = 2;
  const validValues = [["world", "hello"]];
  const invalidValues = [null, void 0, ["hi"]];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayMinSize)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayMinSize)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayMinSize)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayMinSize";
    const message = "someProperty must contain at least " + (0, import_ValidationUtils.constraintToString)(constraint) + " elements";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayMaxSize", () => {
  const constraint = 2;
  const validValues = [["world", "hello"]];
  const invalidValues = [null, void 0, ["hi", "hello", "javascript"]];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayMaxSize)(constraint)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayMaxSize)(value, constraint)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayMaxSize)(value, constraint)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayMaxSize";
    const message = "someProperty must contain not more than " + (0, import_ValidationUtils.constraintToString)(constraint) + " elements";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayUnique", () => {
  const validValues = [
    ["world", "hello", "superman"],
    ["world", "superman", "hello"],
    ["superman", "world", "hello"],
    ["1", "2", null, void 0]
  ];
  const invalidValues = [
    null,
    void 0,
    ["world", "hello", "hello"],
    ["world", "hello", "world"],
    ["1", "1", "1"]
  ];
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayUnique)()
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayUnique)(value)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayUnique)(value)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayUnique";
    const message = "All someProperty's elements must be unique";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("ArrayUnique with identifier", () => {
  const identifier = (o) => o.name;
  const validValues = [
    ["world", "hello", "superman"],
    ["world", "superman", "hello"],
    ["superman", "world", "hello"],
    ["1", "2", null, void 0]
  ].map((list) => list.map((name) => ({ name })));
  const invalidValues = [
    null,
    void 0,
    ["world", "hello", "hello"],
    ["world", "hello", "world"],
    ["1", "1", "1"]
  ].map((list) => list == null ? void 0 : list.map((name) => name != null ? { name } : name));
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.ArrayUnique)(identifier)
  ], MyClass.prototype, "someProperty", 2);
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.arrayUnique)(value, identifier)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.arrayUnique)(value, identifier)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "arrayUnique";
    const message = "All someProperty's elements must be unique";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
describe("isInstance", () => {
  class MySubClass {
  }
  class WrongSubClass {
  }
  class MyClass {
  }
  __decorateClass([
    (0, import_decorators.IsInstance)(MySubClass)
  ], MyClass.prototype, "someProperty", 2);
  const validValues = [new MySubClass()];
  const invalidValues = [null, void 0, 15, "something", new WrongSubClass(), () => null];
  it("should not fail if validator.validate said that its valid", () => {
    return checkValidValues(new MyClass(), validValues);
  });
  it("should fail if validator.validate said that its invalid", () => {
    return checkInvalidValues(new MyClass(), invalidValues);
  });
  it("should not fail if method in validator said that its valid", () => {
    validValues.forEach((value) => expect((0, import_decorators.isInstance)(value, MySubClass)).toBeTruthy());
  });
  it("should fail if method in validator said that its invalid", () => {
    invalidValues.forEach((value) => expect((0, import_decorators.isInstance)(value, MySubClass)).toBeFalsy());
  });
  it("should return error object with proper data", () => {
    const validationType = "isInstance";
    const message = "someProperty must be an instance of MySubClass";
    return checkReturnedError(new MyClass(), invalidValues, validationType, message);
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkInvalidValues,
  checkReturnedError,
  checkValidValues
});
//# sourceMappingURL=validation-functions-and-decorators.spec.js.map
