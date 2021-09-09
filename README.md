### write every plugin-function like static fn in someone class
* in future you may hang decorator on this function, because it is a method now
* also hang decorator on class itself

### use global emitter for control botstraping flow
* we don't want to hang all stuff on fastify instance
* so we must carefuly control bootstrapping especialy of async operations
* fastify incapsulation is great but not simple for sharing general things
* it is the same as call-back hell
---
1. no save all things in fastify-instance
2. no repeat call-back like register hell

# convention's rules
* naming plugins:
    * wrapped plugin class has name started upperCase '+---Plugin'
    * his main function the same but first lowerCase '----plugin'
    * simple destructorizing export

```
class ExamplePlugin {
  static async plugin(
    server: FastifyInstanse,
    options: RegisterOptions,
  ) {
    ...
  }
}

export const { examplePlugin } = ExamplePlugin;

```