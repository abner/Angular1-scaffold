import { Directive, Inject, Input, HostBinding } from 'ng-metadata/core';

import { AuthenticationService, SessionService } from '../auth';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective {

    logged: boolean = false;

    @HostBinding('[class.hide]') hide = !this.sessionService.logged;

    constructor(
        @Inject(AuthenticationService) private authenticationService: AuthenticationService,
        @Inject(SessionService) private sessionService: SessionService
    ) {

        authenticationService.onLoginOK.subscribe(ok => this.hide = !ok);
        authenticationService.onLogout.subscribe(() => this.hide = true);
    }




}
