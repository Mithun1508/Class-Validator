# Installation
npm install class-validator --save

Note: Please use at least npm@6 when using class-validator. From npm@6 the dependency tree is flattened, which is required by class-validator to function properly.

# Usage
Create your class and put some validation decorators on the properties you want to validate:

import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class Post {
  @Length(10, 20)
  title: string;
  
  

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;



  @IsDate()
  createDate: Date;
}

let post = new Post();
post.title = 'Hello'; // should not pass
post.text = 'this is a great post about hell world'; // should not pass
post.rating = 11; // should not pass
post.email = 'google.com'; // should not pass
post.site = 'googlecom'; // should not pass


validate(post).then(errors => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.log('validation failed. errors: ', errors);
  } else {
    console.log('validation succeed');
  }
});


validateOrReject(post).catch(errors => {
  console.log('Promise rejected (validation failed). Errors: ', errors);
});
// or
async function validateOrRejectExample(input) {
  try {
    await validateOrReject(input);
  } catch (errors) {
    console.log('Caught promise rejection (validation failed). Errors: ', errors);
  }
  
  
  
}
# Passing options
The validate function optionally expects a ValidatorOptions object as a second parameter:

export interface ValidatorOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
  groups?: string[];
  dismissDefaultMessages?: boolean;
  validationError?: {
    target?: boolean;
    value?: boolean;
  };

  forbidUnknownValues?: boolean;
  stopAtFirstError?: boolean;
}
It's highly advised to set forbidUnknownValues: true as it will prevent unknown objects from passing validation.

# Using service container
Validator supports service container in the case if want to inject dependencies into your custom validator constraint classes. Here is example how to integrate it with typedi:

import { Container } from 'typedi';
import { useContainer, Validator } from 'class-validator';

// do this somewhere in the global application level:
useContainer(Container);
let validator = Container.get(Validator);

// now everywhere you can inject Validator class which will go from the container
// also you can inject classes using constructor injection into your custom ValidatorConstraint-s
Synchronous validation
If you want to perform a simple non async validation you can use validateSync method instead of regular validate method. It has the same arguments as validate method. But note, this method ignores all async validations you have.

Defining validation schema without decorators
You can define your validation schemas without decorators:

you can define it in the separate object
you can define it in the .json file
This feature maybe useful in the cases if:

are using es5/es6 and don't have decorators available
you don't have a classes, and instead using interfaces
you don't want to use model at all
you want to have a validation schema separate of your model
you want beautiful json-schema based validation models
you simply hate decorators
Here is an example of using it:

# Create a schema object:

import { ValidationSchema } from 'class-validator';
export let UserValidationSchema: ValidationSchema = {
  // using interface here is not required, its just for type-safety
  name: 'myUserSchema', // this is required, and must be unique
  properties: {
    firstName: [
      {
        type: 'minLength', // validation type. All validation types are listed in ValidationTypes class.
        constraints: [2],
      },
      {
        type: 'maxLength',
        constraints: [20],
      },
    ],
    lastName: [
      {
        type: 'minLength',
        constraints: [2],
      },
      {
        type: 'maxLength',
        constraints: [20],
      },
    ],
    email: [
      {
        type: 'isEmail',
      },
    ],
  },
};
Same schema can be provided in .json file, depend on your wish.

# Register your schema:

import { registerSchema } from 'class-validator';
import { UserValidationSchema } from './UserValidationSchema';
registerSchema(UserValidationSchema); // if schema is in .json file, then you can simply do registerSchema(require("path-to-schema.json"));
Better to put this code in a global place, maybe when you bootstrap your application, for example in app.ts.

# Validate your object using validation schema:

import { validate } from 'class-validator';
const user = { firstName: 'Johny', secondName: 'Cage', email: 'johny@cage.com' };
validate('myUserSchema', user).then(errors => {
  if (errors.length > 0) {
    console.log('Validation failed: ', errors);
  } else {
    console.log('Validation succeed.');
  }
});
That's it. Here "myUserSchema" is the name of our validation schema. validate method will perform validation based on this schema

# Manual validation
There are several method exist in the Validator that allows to perform non-decorator based validation:

import { isEmpty, isBoolean } from 'class-validator';

isEmpty(value);
isBoolean(value);

![Screenshot (81)](https://user-images.githubusercontent.com/93249038/214748035-57c2cc68-ae12-40ec-ac19-67261e5191eb.png)
