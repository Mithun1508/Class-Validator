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
var Post_exports = {};
__export(Post_exports, {
  Post: () => Post,
  PostType: () => PostType
});
module.exports = __toCommonJS(Post_exports);
var import_decorators = require("../../src/decorator/decorators");
var PostType = /* @__PURE__ */ ((PostType2) => {
  PostType2[PostType2["Public"] = 0] = "Public";
  PostType2[PostType2["Private"] = 1] = "Private";
  return PostType2;
})(PostType || {});
class Post {
}
__decorateClass([
  (0, import_decorators.MinLength)(10),
  (0, import_decorators.MaxLength)(20)
], Post.prototype, "title", 2);
__decorateClass([
  (0, import_decorators.Contains)("hello")
], Post.prototype, "text", 2);
__decorateClass([
  (0, import_decorators.IsInt)()
], Post.prototype, "rating", 2);
__decorateClass([
  (0, import_decorators.IsEmail)()
], Post.prototype, "email", 2);
__decorateClass([
  (0, import_decorators.IsFQDN)()
], Post.prototype, "site", 2);
__decorateClass([
  (0, import_decorators.IsDate)()
], Post.prototype, "createDate", 2);
__decorateClass([
  (0, import_decorators.ArrayNotEmpty)(),
  (0, import_decorators.ArrayMinSize)(2),
  (0, import_decorators.ArrayMaxSize)(5),
  (0, import_decorators.MinLength)(3, { each: true, message: "Tag is too short. Minimal length is $value characters" }),
  (0, import_decorators.MaxLength)(50, { each: true, message: "Tag is too long. Maximal length is $value characters" })
], Post.prototype, "tags", 2);
__decorateClass([
  (0, import_decorators.IsEnum)(PostType)
], Post.prototype, "type", 2);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Post,
  PostType
});
//# sourceMappingURL=Post.js.map
