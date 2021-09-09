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