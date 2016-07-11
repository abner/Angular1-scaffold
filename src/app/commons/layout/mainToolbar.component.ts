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

    constructor(
        @Inject('$mdSidenav') private $mdSidenav: ng.material.ISidenavService,
        @Inject('$mdBottomSheet') private $mdBottomSheet: ng.material.IBottomSheetService,
        @Inject('APP_TITLE') public title: string
        ) {

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
