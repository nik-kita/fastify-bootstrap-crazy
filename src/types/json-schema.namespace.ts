import { JSONSchema7 as OriginSchema } from 'json-schema';

declare module 'json-schema' {
  export interface JSONSchema7 {
    objectId?: true,
  }
}
