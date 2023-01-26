"use strict";
var import_Validator = require("../../src/validation/Validator");
var import_Post = require("./Post");
let validator = new import_Validator.Validator();
let post1 = new import_Post.Post();
post1.title = "Hello world";
validator.validate(post1).then((result) => {
  console.log("1. should not pass: ", result);
});
let post2 = new import_Post.Post();
post2.title = "Hello !!!";
validator.validate(post2).then((result) => {
  console.log("2. should pass: ", result);
});
//# sourceMappingURL=app.js.map
