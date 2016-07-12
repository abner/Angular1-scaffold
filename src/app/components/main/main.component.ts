import { Component, Inject, OnInit } from 'ng-metadata/core';
import { DASHBOARD_BOXES_COMPONENTS } from '../dashboard';

@Component({
    selector: 'main-component',
    template: require('./_main.html'),
    directives: [...DASHBOARD_BOXES_COMPONENTS]
})
export class MainComponent implements OnInit {
    content: string = 'Algum conteúdo aqui!';
    currentNavItem: string = '';
    constructor(
        @Inject('$log') private $log: ng.ILogService,
        @Inject('$state') private $state: ng.ui.IStateService
    ) {
        $log.info('MainComponent constructed!');
    }

    ngOnInit() {
        this.currentNavItem = this.$state.current.name.replace('main.', '');

        this.currentNavItem = (this.currentNavItem === 'index' ? 'projects' : this.currentNavItem);
    }

    goto(state: string) {
        this.$state.go(state);
    }
}
