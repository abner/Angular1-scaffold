import { Component, Inject, OpaqueToken, EventEmitter, Output } from 'ng-metadata/core';
import { BackendService } from '../../commons/services/backend';
import { Team } from '../../commons/models';

import { TeamBackendRestService } from './rest.service';
import { TeamBackendMockService } from './mock.service';

export const TEAM_BACKEND_SERVICE = new OpaqueToken('TEAM_BACKEND_SERVICE');

let provideBackendService: Object = {
    provide: TEAM_BACKEND_SERVICE,
    useClass: TeamBackendRestService
};

if (ENV === 'prototyping') {
    provideBackendService = {
        provide: TEAM_BACKEND_SERVICE,
        useClass: TeamBackendMockService
    };
}

@Component({
    selector: 'team-add-form',
    template: require('./_add.html'),
    styles: require('./team.scss'),
    providers: [provideBackendService]
})
export class AddTeamFormComponent {

    @Output('onSave')
    onSave: EventEmitter<Team> = new EventEmitter<Team>();

    team: Team;

    constructor(
        @Inject(TEAM_BACKEND_SERVICE) private backendService: BackendService<Team>,
        @Inject('$mdBottomSheet') private $mdBottomSheet: ng.material.IBottomSheetService,
        @Inject('$state') private $state: ng.ui.IStateService
    ) {
        this.team = <Team> {};
    }

    submit() {
        this.backendService.insert(this.team)
            .subscribe(() => {
                this.onSave.emit(this.team);
                this.$mdBottomSheet.hide('saved');
            });
    }
}
