

import { Injectable, OnInit, Inject } from 'ng-metadata/core';
import { User } from '../models';
import { AuthenticationService }  from './authentication.service';

@Injectable()
export class SessionService {
    private _currentUser: User;
    private _logged: boolean = false;

    get logged(): boolean {
        return this._logged;
    }

    constructor(
        @Inject('localStorageService') private localStorageService: angular.local.storage.ILocalStorageService,
        @Inject(AuthenticationService) private authenticationService: AuthenticationService
    ) {
        this._currentUser = this.localStorageService.get<User>('currentUser');

        this._logged = this.isLogged();

        this.authenticationService.onLoginOK.subscribe((user: User) => {
            this.currentUser = user;
            this._logged = true;
        });

        this.authenticationService.onLogout.subscribe((user: User) => {
            this._currentUser = null;
            this._logged = false;
            this.localStorageService.remove('currentUser');
        });
    }

    private isLogged(): boolean {
        return this._currentUser !== null && this._currentUser !== undefined;
    }

    get currentUser(): User {
        return this._currentUser;
    }

    set currentUser(user: User) {
        this._currentUser = user;
        this.localStorageService.set<User>('currentUser', user);
    }

    clear() {
        this._currentUser = null;
        this.localStorageService.remove('currentUser');
    }


}
