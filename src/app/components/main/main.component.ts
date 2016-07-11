

import { Component, Inject } from 'ng-metadata/core';

@Component({
    selector: 'main-component',
    template: require('./_main.html')
})
export class MainComponent {
    content: string = 'Algum conteúdo aqui!';
    constructor(@Inject('$log') private $log: ng.ILogService) {
        $log.info('MainComponent constructed!');
    }
}
