import { BaseController } from '../base/controller.base';
import { BaseRepository } from '../base/repository.base';
import { BaseService } from '../base/service.base';
import { ClassType } from './class-type';

export type ComponentDeclarationType<
  R = ClassType<BaseRepository>,
  S = ClassType<BaseService>,
  C = ClassType<BaseController>
  > = {
    repository: R,
    service: S,
    controller: C
  }
