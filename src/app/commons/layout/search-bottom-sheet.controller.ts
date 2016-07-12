import { Inject } from 'ng-metadata/core';


export class SearchBottomSheetController {
    static $inject = ['$log'];
    constructor(
        private log: ng.ILogService
    ) {
        log.info('Search controller constructed!');
    }

    search() {
        this.log.info('Search called!');
    }
}
