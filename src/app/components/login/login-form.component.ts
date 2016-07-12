import { Component, Inject, EventEmitter } from 'ng-metadata/core';
import { AuthenticationService } from '../../commons/auth';
import { User, AuthData } from '../../commons/models';


@Component({
    selector: 'login-form',
    template: require('./_login.html'),
    styles: [require('./login.scss')]
})
export class LoginFormComponent {
    private user: AuthData = { username: '', password: ''};
    constructor(
        @Inject(AuthenticationService) private authenticationService: AuthenticationService
    ) {

    }

    login() {
        this.authenticationService.authenticate(this.user);
        return false;
    }
}
