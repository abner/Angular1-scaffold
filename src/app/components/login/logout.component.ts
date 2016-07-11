import { Inject, Component } from 'ng-metadata/core';
import { AuthenticationService, SessionService } from '../../commons/auth'

@Component({
    selector: 'logout-comp-not-used',
    template: ''
})
export class LogoutComponent {
    constructor(@Inject(AuthenticationService) authenticationService: AuthenticationService,
        @Inject(SessionService) sessionService: SessionService,
        @Inject('$state') $state: ng.ui.IStateService
    ) {
        authenticationService.logout();
        sessionService.clear();
        $state.go('login');
    }
}
