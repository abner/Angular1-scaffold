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
        // if (this.$state.current.name === 'main.index') {
        //     this.$state.go('main.projects');
        // }
        this.currentNavItem = this.$state.current.name.replace('main.', '');

        this.currentNavItem = (this.currentNavItem === 'index' ? 'projects' : this.currentNavItem);

        console.log("CURRENT NAV ITEM", this.currentNavItem);
    }

    goto(state: string) {
        this.$state.go(state);
    }
}
