import { Component, Inject } from 'ng-metadata/core';
import { SearchBottomSheetController } from './searchBottomSheet.controller';
import { CurrentUserBoxComponent } from './currentUserBox.component';

import { ShowIfLoggedDirective } from '../auth';

@Component({
    selector: 'main-toolbar',
    directives: [CurrentUserBoxComponent, ShowIfLoggedDirective],
    styles: require('./mainToolbar.scss'),
    template: require('./_mainToolbar.html')
})
export class MainToolbarComponent {

    searchEnabled: boolean = true;
    loading: boolean = false;

    constructor(
        @Inject('$mdSidenav') private $mdSidenav: ng.material.ISidenavService,
        @Inject('$mdBottomSheet') private $mdBottomSheet: ng.material.IBottomSheetService,
        @Inject('APP_TITLE') public title: string,
        @Inject('$rootScope') $rootScope: ng.IRootScopeService
    ) {
        $rootScope.$on('cfpLoadingBar:started', () => {
            this.loading = true;
        });

        $rootScope.$on('cfpLoadingBar:completed', () => {
            this.loading = false;
        });
    }

    openLeftSidebar() {
        this.$mdSidenav('left').open();
    }

    enableSearch() {
        this.searchEnabled = true;
        this.$mdBottomSheet.show({
            template: require('./_searchBottomSheet.html'),
            controller: SearchBottomSheetController,
            controllerAs: '$ctrl'
        })
    }
}
