import { Component, Inject, EventEmitter, OnInit } from 'ng-metadata/core';
import { SessionService } from '../../commons/auth';
import { User } from '../../commons/models';


@Component({
    selector: 'account-show-form',
    template: require('./_show.html'),
    styles: [require('./account.scss')]
})
export class AccountShowPageComponent implements OnInit {
    private account: User;
    constructor(
        @Inject(SessionService) private sessionService: SessionService,
        @Inject('$state') private $state: ng.ui.IStateService
    ) {
    }

    ngOnInit() {
        this.account = angular.copy(this.sessionService.currentUser);
    }

    get currentAccount(): User {
        return this.account;
    }

    update() {
        this.sessionService.currentUser = this.account;
        this.$state.go('main');
        return false;
    }
}
