
import {APP_PREFIX} from '../../app.component';

import { AUTH_HTTP_INTERCEPTOR, CORS_HTTP_INTERCEPTOR } from '../../commons/http';

httpProviderConfig.$inject = ['$httpProvider'];

export function httpProviderConfig($httpProvider: ng.IHttpProvider) {
    // Adding the interceptors by name, using the Opaque tokens
    // The actual interceptors implementation should be configured in 'app.http.interceptors.ts' file
    // and the constant HTTP_INTERCEPTORS_PROVIDERS should be added to the providers list
    // of the AppComponent
    $httpProvider.interceptors.push(AUTH_HTTP_INTERCEPTOR.desc);
    $httpProvider.interceptors.push(CORS_HTTP_INTERCEPTOR.desc);
}
