import {
    AUTH_HTTP_INTERCEPTOR,
    AuthHttpInterceptorImpl,
    CORS_HTTP_INTERCEPTOR,
    CorsHttpInterceptorImpl
} from './commons/http';


export const HTTP_INTERCEPTORS_PROVIDERS = [
    { provide: AUTH_HTTP_INTERCEPTOR, useClass: AuthHttpInterceptorImpl },
    { provide: CORS_HTTP_INTERCEPTOR, useClass: CorsHttpInterceptorImpl }
];

