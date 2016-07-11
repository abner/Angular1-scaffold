
import { Directive, Inject, AfterViewInit} from 'ng-metadata/core';

@Directive({
    selector: '[autofocus]'
})
export class AutoFocusDirective implements AfterViewInit {
    constructor(
        @Inject('$timeout') private $timeout: ng.ITimeoutService,
        @Inject('$element') private $element: ng.IAugmentedJQuery
    ) {

    }

    ngAfterViewInit() {
        this.$timeout(() => {
            this.$element[0].focus();
        });
    }
}

