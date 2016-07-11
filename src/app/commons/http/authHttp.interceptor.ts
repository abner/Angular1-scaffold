import { Injectable, Inject, OpaqueToken } from 'ng-metadata/core';

import { AuthenticationService, SessionService} from '../auth';

import { AUTH_EVENTS } from '../auth/authEvents.enum';
import { HttpInterceptor } from './httpInterceptor';

export const AUTH_HTTP_INTERCEPTOR = new OpaqueToken('AuthHttpInterceptor');

@Injectable()
export class AuthHttpInterceptorImpl extends HttpInterceptor implements ng.IHttpInterceptor {

    constructor(
        @Inject('$q') private $q: ng.IQService,
        @Inject(SessionService) private sessionService: SessionService,
        @Inject(AuthenticationService) private authenticationService: AuthenticationService,
        @Inject('$log') private $log: ng.ILogService
    ) {
        super();
    }


    responseError(response: ng.IHttpPromiseCallbackArg<any>) {

        this.authenticationService.emitAuthEvents(this.getEvent(response.status));

        return this.$q.reject(response);
    }

    request(config: ng.IRequestConfig): ng.IRequestConfig | ng.IPromise<ng.IRequestConfig> {
        config.headers['JWT-TOKEN'] = this.sessionService.currentUser.token;
        this.$log.info('INTERCEPTOR called!!!! ', config);
        return this.$q.when(config);
    }


    private getEvent(statusCode: number | string): AUTH_EVENTS {
        return {
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
        }[statusCode];
    }
}
