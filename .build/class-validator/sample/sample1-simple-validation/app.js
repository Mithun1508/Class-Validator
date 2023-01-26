"use strict";
var import_src = require("../../src/index");
var import_Post = require("./Post");
let post1 = new import_Post.Post();
post1.title = "Hello world";
post1.text = "this is a great post about hello world";
post1.rating = 10;
post1.email = "info@google.com";
post1.site = "google.com";
post1.createDate = new Date();
post1.tags = ["abcd1", "abcd2", "abcd3", "abcd4", "abcd4"];
post1.type = import_Post.PostType.Private;
(0, import_src.validate)(post1).then((result) => {
  console.log("1. should pass: ", result);
});
let post2 = new import_Post.Post();
post2.title = "Hello";
post2.text = "this is a great post about hell world";
post2.rating = 1.1;
post2.email = "google.com";
post2.site = "googlecom";
post2.type = import_Post.PostType.Private;
(0, import_src.validate)(post2).then((result) => {
  console.log("2. should not pass: ", result);
});
let post3 = new import_Post.Post();
post3.title = "Hello";
post3.text = "this is a great post about hell world";
post3.rating = 1.1;
post3.email = "google.com";
post3.site = "googlecom";
post3.type = import_Post.PostType.Private;
(0, import_src.validate)(post3, { skipMissingProperties: true }).then((result) => {
  console.log("3. should not pass: ", result);
});
let post4 = new import_Post.Post();
post4.title = "Hello world";
post4.text = "this is a great post about hello world";
post4.rating = 10;
post4.email = "info@google.com";
post4.site = "google.com";
post4.type = import_Post.PostType.Private;
(0, import_src.validate)(post4, { skipMissingProperties: true }).then((result) => {
  console.log("4. should pass: ", result);
});
let post5 = new import_Post.Post();
post5.title = "Hello world";
post5.text = "this is a great post about hello world";
post5.rating = 10;
post5.email = "info@google.com";
post5.site = "google.com";
post5.type = import_Post.PostType.Private;
(0, import_src.validate)(post5, { skipMissingProperties: true }).then((result) => {
  console.log("5. should pass: ", result);
});
let post6 = new import_Post.Post();
post6.title = "Hello world";
post6.text = "this is a great post about hello world";
post6.rating = 10;
post6.email = "info@google.com";
post6.site = "google.com";
post6.createDate = new Date();
post6.tags = ["abcd1", "abcd2", "abcd3", "abcd4", "abcd4"];
post6.type = import_Post.PostType.Private;
(0, import_src.validate)(post6).then((result) => {
  console.log("6. should pass: ", result);
});
let post7 = new import_Post.Post();
post7.title = "Hello world";
post7.text = "this is a great post about hello world";
post7.rating = 10;
post7.email = "info@google.com";
post7.site = "google.com";
post7.createDate = new Date();
post7.tags = ["news", "a"];
post7.type = import_Post.PostType.Private;
(0, import_src.validate)(post7).then((result) => {
  console.log("7. should not pass: ", result);
});
let post8 = new import_Post.Post();
post8.title = "Hello world";
post8.text = "this is a great post about hello world";
post8.rating = 10;
post8.email = "info@google.com";
post8.site = "google.com";
post8.createDate = new Date();
post8.tags = [];
post8.type = import_Post.PostType.Private;
(0, import_src.validate)(post8).then((result) => {
  console.log("8. should not pass: ", result);
});
let post9 = new import_Post.Post();
post9.title = "Hello world";
post9.text = "this is a great post about hello world";
post9.rating = 10;
post9.email = "info@google.com";
post9.site = "google.com";
post9.createDate = new Date();
post9.tags = ["abcd1", "abcd2", "abcd3", "abcd4", "abcd4", "abcd4"];
post9.type = import_Post.PostType.Private;
(0, import_src.validate)(post9).then((result) => {
  console.log("9. should not pass: ", result);
});
let post10 = new import_Post.Post();
post10.title = "Hello world";
post10.text = "this is a great post about hello world";
post10.rating = 10;
post10.email = "info@google.com";
post10.site = "google.com";
post10.createDate = new Date();
post10.tags = ["abcd1", "abcd2", "abcd3", "abcd4", "abcd4"];
post10.type = import_Post.PostType.Private;
(0, import_src.validate)(post10).then((result) => {
  console.log("10. should pass: ", result);
});
let post11 = new import_Post.Post();
post11.title = "Hello world";
post11.text = "this is a great post about hello world";
post11.rating = 10;
post11.email = "info@google.com";
post11.site = "google.com";
post11.createDate = new Date();
post11.tags = null;
post11.type = import_Post.PostType.Private;
(0, import_src.validate)(post11).then((result) => {
  console.log("11. should not pass: ", result);
});
let post12 = new import_Post.Post();
post12.title = "Hello world";
post12.text = "this is a great post about hello world";
post12.rating = 10;
post12.email = "info@google.com";
post12.site = "google.com";
post12.createDate = new Date();
post12.tags = ["abcd1", "abcd2", "abcd3", "abcd4", "abcd4"];
post12.type = 99;
(0, import_src.validate)(post1).then((result) => {
  console.log("12. should not pass: ", result);
});
//# sourceMappingURL=app.js.map
