import { Injectable, Inject, OpaqueToken } from 'ng-metadata/core';

import { AuthenticationService, SessionService, AUTH_EVENTS } from './commons/auth';

import { UserNotificationService } from './commons/notification/user-notification.service';

export const LOGIN_ROUTE_NAME = new OpaqueToken('LoginRouteName');
export const NOTFOUND_ROUTE_NAME = new OpaqueToken('404RouteName');

@Injectable()
export class AppNavigationService {

    private lastStateAccessed: { state: ng.ui.IState, params: any };

    constructor(
        @Inject(AuthenticationService) private authenticationService: AuthenticationService,
        @Inject(SessionService) private sessionService: SessionService,
        @Inject(UserNotificationService) private userNotificationService: UserNotificationService,
        @Inject('$state') private $state: ng.ui.IStateService,
        @Inject('$timeout') private $timeout: ng.ITimeoutService,
        @Inject('$rootScope') private $rootScope: ng.IRootScopeService,
        @Inject(LOGIN_ROUTE_NAME) private loginRouteName: string,
        @Inject(NOTFOUND_ROUTE_NAME) private notFoudRouteName: string
    ) {
        this.subscribeToAuthEvents();
        this.subscribeToNavigationEvents();
    }

    private subscribeToNavigationEvents() {
        this.$rootScope.$on('$stateChangeStart', this.checkAuthentication.bind(this));
        this.$rootScope.$on('$stateChangeStart', this.checkAuthorization.bind(this));
    }

    private checkAuthentication(
        event: ng.IAngularEvent,
        toState: ng.ui.IState,
        toParams: any,
        fromState: ng.ui.IState,
        fromParams: any,
        options: ng.ui.IStateOptions) {
        if (toState.data && toState.data.loginRequired && !this.sessionService.logged) {
            event.preventDefault();
            this.authenticationService.onAuthEvents.next(AUTH_EVENTS.notAuthenticated);
            return;
        }
    }



    private checkAuthorization(
        event: ng.IAngularEvent,
        toState: ng.ui.IState,
        toParams: any,
        fromState: ng.ui.IState,
        fromParams: any,
        options: ng.ui.IStateOptions
    ) {

        debugger;
        if (toState.data && toState.data.allowedRoles && toState.data.loginRequired) {

            let rolesFound: string[];
            let userRoles = this.sessionService.currentUser.roles;

            // if user does not have roles defiend
            if (!userRoles && toState.data.allowedRoles.length > 0) {
                event.preventDefault();
                this.lastStateAccessed = { state: fromState, params: fromParams };
                // then emits notAuthorized event
                this.authenticationService.onAuthEvents.next(AUTH_EVENTS.notAuthorized);
                return;
            }

            // of if the user roles does not match the required roles
            rolesFound = userRoles.filter((r) => toState.data.allowedRoles.indexOf(r) >= 0);
            if (rolesFound.length === 0) {
                event.preventDefault();
                this.lastStateAccessed = { state: fromState, params: fromParams };
                // then emits notAuthorized event also
                this.authenticationService.onAuthEvents.next(AUTH_EVENTS.notAuthorized);
                return;
            }
        }
    }

    private subscribeToAuthEvents() {
        this.authenticationService.onAuthEvents.subscribe((authEvent: AUTH_EVENTS) => {
            switch (authEvent) {
                case AUTH_EVENTS.notAuthenticated:
                    this.$state.go(this.loginRouteName);
                    break;
                case AUTH_EVENTS.sessionTimeout:
                    this.$state.go(this.loginRouteName);
                    break;
                case AUTH_EVENTS.notAuthorized:
                    this.userNotificationService
                        .showNotification('User not authorized!')
                        .subscribe();
                    // this.$timeout(
                    //                        () =>
                    if (this.lastStateAccessed.state.abstract === true) {
                        this.$state.go('main.index');
                    } else {
                        this.$state.transitionTo(this.lastStateAccessed.state, this.lastStateAccessed.params);
                    }


                    //                      2000);
                    break;
            }
        });
    }
}
