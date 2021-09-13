import { ClassType } from '../types/class-type';
import { ComponentDeclarationType } from '../types/component-declaration.type';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';

export const COMPONENTS: ComponentDeclarationType[] = [
  {
    repository: UserRepository,
    service: UserService,
    controller: UserController,
  },
];

export const {
  REPOSITORIES,
  SERVICES,
  CONTROLLERS,
} = COMPONENTS.reduce((acc, {
  repository,
  service,
  controller,
}) => {
  acc.REPOSITORIES.push(repository);
  acc.SERVICES.push(service);
  acc.CONTROLLERS.push(controller);

  return acc;
}, {
  REPOSITORIES: [] as ClassType<any>[],
  SERVICES: [] as ClassType<any>[],
  CONTROLLERS: [] as ClassType<any>[],
});
