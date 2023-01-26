"use strict";
var import_Validator = require("../../src/validation/Validator");
var import_Post = require("./Post");
var import_Tag = require("./Tag");
let validator = new import_Validator.Validator();
let tag1 = new import_Tag.Tag();
tag1.name = "ja";
let tag2 = new import_Tag.Tag();
tag2.name = "node.js";
let post1 = new import_Post.Post();
post1.title = "Hello world";
post1.tags = [tag1, tag2];
validator.validate(post1).then((result) => {
  console.log("1. should not pass: ", result);
});
//# sourceMappingURL=app.js.map
