(function() {
    'use strict';

    var core = angular.module('app.core');

//    core.config(toastrConfig);
//
//    /* @ngInject */
//    function toastrConfig(toastr) {
//        toastr.options.timeOut = 4000;
//        toastr.options.positionClass = 'toast-bottom-right';
//    }

    var config = {
        appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Angular Modular Demo',
        version: '1.0.0'
    };

    core.value('config', config);


    core.config(configure);

    configure.$inject = ['$logProvider', '$routeProvider', '$httpProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider'];

    /* @ngInject */
    function configure ($logProvider, $routeProvider, $httpProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
//        var resolveAlways = { /* @ngInject */
//            ready: function(dataservice) {
//                return dataservice.ready();
//            }
//            // ready: ['dataservice', function (dataservice) {
//            //    return dataservice.ready();
//            // }]
//        };
//        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);




        $httpProvider.interceptors.push(['$q', '$rootScope', 'appService', 'ENV', function ($q, $rootScope, appService, ENV) {

                return {
                    'request': function (config) {
                        $rootScope.$broadcast('loading-started');

                        //var token = appService.getToken();

                        if (ENV.name === "development") {
                            if (config.url.indexOf("api") !== -1) {
                                config.url = ENV.apiEndpoint + config.url;
                            }
                        }
                        //alert('token ' + token);
//                        if (token) {
//                            config.headers['Authorization'] = "Token " + token;
//                        }

//                        config.headers["Access-Control-Allow-Origin"] = "*";
//                        config.headers['Access-Control-Allow-Methods'] = 'OPTIONS,GET,POST,PUT,DELETE';
//                        config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
//
                       // alert(config.headers);

                        return config || $q.when(config);
                    },
                    'response': function (response) {
                        $rootScope.$broadcast('loading-complete');
                        return response || $q.when(response);
                    },
                    'responseError': function (rejection) {
                        $rootScope.$broadcast('loading-complete');
                        return $q.reject(rejection);
                    },
                    'requestError': function (rejection) {
                        $rootScope.$broadcast('loading-complete');
                        return $q.reject(rejection);
                    }
                };
        }]);

        $httpProvider.interceptors.push(['$injector', function ($injector) {
            return $injector.get('AuthInterceptor');
        }]);

    }

    //core.run(appRun);

    appRun.$inject = ['$rootScope', '$location', '$window', 'AUTH_EVENTS', 'APP_EVENTS', 'USER_ROLES', 'authService', 'appService', 'alertService'];

    /* @ngInject */
    function appRun($rootScope, $location, $window, AUTH_EVENTS, APP_EVENTS, USER_ROLES, authService, appService, alertService) {

        $rootScope.$on('$routeChangeStart', function (event, next) {

            if (next.redirectTo !== '/') {
                var authorizedRoles = next.data.authorizedRoles;

                if (authorizedRoles.indexOf(USER_ROLES.NOT_LOGGED) === -1) {

                    if (!authService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if (authService.isAuthenticated()) {
                            // user is not allowed
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            // user is not logged in
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                }
            }
        });


        $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
            $location.path("/403");
        });

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $rootScope.currentUser = null;
            appService.removeToken();
            $location.path("/login");
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
            appService.removeToken();
            $location.path("/login");
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = null;
            appService.removeToken();
            $location.path("/consultadue");
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            $location.path("/dashboard");
        });

        $rootScope.$on(APP_EVENTS.offline, function () {
            alertService.clear();
            alertService.addWithTimeout('danger', 'Servidor esta temporariamente indisponível, tente mais tarde');
        });

        // Check if a new cache is available on page load.
        $window.addEventListener('load', function (e) {
            $window.applicationCache.addEventListener('updateready', function (e) {
                if ($window.applicationCache.status === $window.applicationCache.UPDATEREADY) {
                    // Browser downloaded a new app cache.
                    $window.location.reload();
                    alert('Uma nova versão será carregada!');
                }
            }, false);
        }, false);

    }


    core.factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS', 'APP_EVENTS'];

    /* @ngInject */
    function AuthInterceptor($rootScope, $q, AUTH_EVENTS, APP_EVENTS) {

        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    '-1': APP_EVENTS.offline,
                    0: APP_EVENTS.offline,
                    404: APP_EVENTS.offline,
                    503: APP_EVENTS.offline,
                    401: AUTH_EVENTS.notAuthenticated,
                    //403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);

                return $q.reject(response);
            }
        };

    }


})();
