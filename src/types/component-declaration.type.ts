import { ClassType } from './class-type';

export type ComponentDeclarationType<
  R = ClassType<any>,
  S = ClassType<any>,
  C = ClassType<any>
  > = {
    repository: R,
    service: S,
    controller: C
  }
