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

# Manual validation
There are several method exist in the Validator that allows to perform non-decorator based validation:

import { isEmpty, isBoolean } from 'class-validator';

isEmpty(value);
isBoolean(value);

![Screenshot (81)](https://user-images.githubusercontent.com/93249038/214748035-57c2cc68-ae12-40ec-ac19-67261e5191eb.png)
