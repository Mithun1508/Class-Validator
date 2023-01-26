"use strict";
var import_utils = require("../src/utils");
describe("convertToArray", () => {
  it("convert Set into array", () => {
    const setExample = /* @__PURE__ */ new Set();
    setExample.add("hello");
    setExample.add("world");
    const newArr = (0, import_utils.convertToArray)(setExample);
    expect(newArr).toBeInstanceOf(Array);
    expect(newArr.length).toEqual(2);
    expect(newArr).toContain("hello");
    expect(newArr).toContain("world");
  });
  it("convert Map into array of values", () => {
    const map = /* @__PURE__ */ new Map();
    map.set("key1", "hello");
    map.set("key2", "world");
    const newArr = (0, import_utils.convertToArray)(map);
    expect(newArr).toBeInstanceOf(Array);
    expect(newArr.length).toEqual(2);
    expect(newArr).toContain("hello");
    expect(newArr).toContain("world");
  });
  it("should return array untouched", () => {
    const arr = ["hello", "world"];
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toEqual(2);
    expect(arr).toContain("hello");
    expect(arr).toContain("world");
  });
});
//# sourceMappingURL=utils.spec.js.map
