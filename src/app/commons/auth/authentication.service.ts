import { Injectable, EventEmitter, Inject } from 'ng-metadata/core';

import { User, AuthData } from '../models';

@Injectable()
export class AuthenticationService  {

    onLoginOK: EventEmitter<User>;
    onLogout: EventEmitter<boolean>;

    constructor(@Inject('$state') private $state: ng.ui.IStateService) {
        this.onLoginOK = new EventEmitter<User>();
        this.onLogout = new EventEmitter<boolean>();
    }

    authenticate(authData: AuthData) {
        if (true) {
            this.onLoginOK.emit(<any> authData);
            this.$state.go('main');
        }
        // else {
        //     this.onLoginOK.emit(false);
        // }
    }

    logout() {
        this.onLogout.emit(true);
    }
}
