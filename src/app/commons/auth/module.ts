import * as angular from 'angular';
import { bundle } from 'ng-metadata/core';
import { AuthenticationService, SessionService } from './';

import { moduleName } from '../../app.module-name';

export const AUTH_MODULE = angular
    .module(moduleName('.auth'), [])
    // .service('AuthenticationService', AuthenticationService)
    // .service('SessionService', SessionService)
    .name;
