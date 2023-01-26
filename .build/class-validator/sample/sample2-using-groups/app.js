"use strict";
var import_Validator = require("../../src/validation/Validator");
var import_Post = require("./Post");
let validator = new import_Validator.Validator();
let post1 = new import_Post.Post();
post1.title = "Hello world";
post1.text = "this is a great post about hello world";
post1.rating = 10;
post1.email = "info@google.com";
post1.site = "google.com";
post1.createDate = new Date();
validator.validate(post1, { groups: ["users"] }).then((result) => {
  console.log("1.1. should pass: ", result);
});
validator.validate(post1, { groups: ["admins"] }).then((result) => {
  console.log("1.2. should pass: ", result);
});
let post2 = new import_Post.Post();
post2.title = "Hi!";
post2.text = "this is a great post about hello world";
post2.rating = 10;
post2.email = "info@google.com";
post2.site = "google.com";
post2.createDate = new Date();
validator.validate(post2, { groups: ["users"] }).then((result) => {
  console.log("2.1. should not pass: ", result);
});
validator.validate(post2, { groups: ["moderators"] }).then((result) => {
  console.log("2.2. should not pass: ", result);
});
validator.validate(post2, { groups: ["admins"] }).then((result) => {
  console.log("2.3. should pass: ", result);
});
validator.validate(post2, { groups: ["users", "admins"] }).then((result) => {
  console.log("2.4. should not pass: ", result);
});
let post3 = new import_Post.Post();
post3.title = "Hello world";
post3.text = "this is a great post about hello world";
post3.rating = 10;
post3.email = "info@google.com";
post3.site = "google.com";
validator.validate(post3, { groups: ["users"] }).then((result) => {
  console.log("3.1. should pass: ", result);
});
validator.validate(post3).then((result) => {
  console.log("3.2. should not pass: ", result);
});
let post4 = new import_Post.Post();
post4.title = "Hello world";
post4.text = "this is a great post about hello world";
post4.rating = 10;
post4.email = "";
post4.site = "google.com";
validator.validate(post4, { groups: ["users"] }).then((result) => {
  console.log("4.1. should not pass: ", result);
});
validator.validate(post4).then((result) => {
  console.log("4.2. should not pass: ", result);
});
//# sourceMappingURL=app.js.map
