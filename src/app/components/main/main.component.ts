import { Component, Inject, OnInit } from 'ng-metadata/core';
import { DASHBOARD_BOXES_COMPONENTS } from '../dashboard';

import { SessionService } from '../../commons/auth';

import { User } from '../../commons/models';

@Component({
    selector: 'main-component',
    template: require('./_main.html'),
    styles: require('./main.scss'),
    directives: [...DASHBOARD_BOXES_COMPONENTS]
})
export class MainComponent implements OnInit {
    content: string = 'Algum conteúdo aqui!';
    currentUser: User;
    currentNavItem: string = '';
    constructor(
        @Inject('$log') private $log: ng.ILogService,
        @Inject('$state') private $state: ng.ui.IStateService,
        @Inject(SessionService) sessionService: SessionService
    ) {
        $log.info('MainComponent constructed!');

        this.currentUser = sessionService.currentUser;
    }

    ngOnInit() {
        this.currentNavItem = this.$state.current.name.replace('main.', '');

        this.currentNavItem = (this.currentNavItem === 'index' ? 'projects' : this.currentNavItem);
    }

    goto(state: string) {
        this.$state.go(state);
    }
}
