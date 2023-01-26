"use strict";
var import_src = require("../../src/index");
var import_Post = require("./Post");
let post1 = new import_Post.Post();
post1.title = "Hello world";
post1.text = "this is a great post about hello world";
post1.rating = 10;
post1.email = "@google.com";
(0, import_src.validate)(post1).then((result) => {
  console.log("1. should not pass: ", result);
});
//# sourceMappingURL=app.js.map
