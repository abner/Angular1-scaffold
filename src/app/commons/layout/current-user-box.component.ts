import { Component, Inject, OnInit } from 'ng-metadata/core';
import { User } from '../models/user';
import { SessionService, AuthenticationService } from '../auth';

@Component({
    selector: 'current-user',
    template: require('./_current-user-box.html'),
    providers: [SessionService, AuthenticationService]
})
export class CurrentUserBoxComponent implements OnInit {
    user: User;
    constructor(
        @Inject(SessionService) private sessionService: SessionService,
        @Inject(AuthenticationService) private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        this.user = this.sessionService.currentUser;
        this.authenticationService.onLoginOK.subscribe((user: User) => {
            this.user = user;
        });
        this.authenticationService.onLogout.subscribe((user: User) => {
            this.user = null;
        });
    }

    logout() {
        this.authenticationService.logout();
    }
}
