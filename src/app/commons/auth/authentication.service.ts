import { Injectable, EventEmitter, Inject } from 'ng-metadata/core';

import { User, AuthData } from '../models';

import { AUTH_EVENTS } from './authEvents.enum';

@Injectable()
export class AuthenticationService {
    private $state: ng.ui.IStateService;

    onLoginOK: EventEmitter<User>;
    onLogout: EventEmitter<boolean>;

    onAuthEvents: EventEmitter<AUTH_EVENTS> = new EventEmitter<AUTH_EVENTS>();

    constructor( @Inject('$injector') private $injector: ng.auto.IInjectorService) {
        this.onLoginOK = new EventEmitter<User>();
        this.onLogout = new EventEmitter<boolean>();
    }

    getState(): ng.ui.IStateService {
        if ( ! this.$state) {
            this.$state = this.$injector.get<ng.ui.IStateService>('$state');
        }

        return this.$state;
    }

    authenticate(authData: AuthData) {
        if (true) {
            let fakeId: number = new Date().getTime();
            let fakeToken: string = fakeId.toString();
            let userLogged: User = {
                id: fakeId,
                login: authData.username,
                token: fakeToken.toString()
            };
            this.onLoginOK.emit(userLogged);
            this.getState().go('main.index');
        }
        // else {
        //     this.onLoginOK.emit(false);
        // }
    }

    logout() {
        this.onLogout.emit(true);
    }

    emitAuthEvents(authEvent: AUTH_EVENTS) {
        this.onAuthEvents.next(authEvent);
    }
}
