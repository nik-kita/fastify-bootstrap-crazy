import { BaseRepository } from '../base/repository.base';
import { BaseService } from '../base/service.base';
import { ClassType } from './class-type.type';

export type ComponentDeclarationType<
  R = ClassType<BaseRepository>,
  S = ClassType<BaseService<any>>,
  C = ClassType<any>
  > = {
    repository: R,
    service: S,
    controller: C
  }
