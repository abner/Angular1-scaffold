import { Component, Inject, EventEmitter } from 'ng-metadata/core';
import { AuthenticationService } from '../../commons/auth';
import { User, AuthData } from '../../commons/models';


@Component({
    selector: 'signup-form',
    template: require('./_signup.html'),
    styles: [require('./signup.scss')]
})
export class SignupFormComponent {
    private user: AuthData = { username: '', password: ''};
    constructor(
        @Inject(AuthenticationService) private authenticationService: AuthenticationService
    ) {

    }

    login() {
        this.authenticationService.authenticate(this.user);
    }
}
