import { Injectable, Inject, OpaqueToken } from 'ng-metadata/core';
import { HttpInterceptor } from './httpInterceptor';

export const CORS_HTTP_INTERCEPTOR = new OpaqueToken('CorsHttpInterceptor');

@Injectable()
export class CorsHttpInterceptorImpl extends HttpInterceptor implements ng.IHttpInterceptor {
    constructor(
        @Inject('$q') private $q: ng.IQService,
        @Inject('$log') private $log: ng.ILogService
    ) {
        super();
        $log.info('CORS INTERCEPTOR constructed');
    }

    request(config: ng.IRequestConfig): ng.IRequestConfig | ng.IPromise<ng.IRequestConfig> {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'OPTIONS,GET,POST,PUT,DELETE';
        config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
        this.$log.info('Cors Interceptor called', config);
        return this.$q.when(config);
    }
}
