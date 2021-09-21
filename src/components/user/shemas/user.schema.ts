import { JSONSchema7 } from 'json-schema';

export const USER_SCHEMA_REF = 'http://f-o-b-s/shemas/user';

export const UserSchema: JSONSchema7 = {
  $id: USER_SCHEMA_REF,
  type: 'object',
  additionalProperties: false,
  required: [
    'email',
    'username',
    'age',
    'password',
    'password2',
    'name',
    'id',
  ],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 10,
    },
    age: {
      type: 'integer',
      minimum: 18,
      maximum: 100,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 32,
    },
    password2: {
      type: 'string',
      const: {
        $data: '1/password',
      },
    },
    male: {
      enum: ['male', 'female'],
      default: 'male',
    },
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 16,
    },
    id: {
      type: 'string',
      objectId: true,
    },
  },
};
