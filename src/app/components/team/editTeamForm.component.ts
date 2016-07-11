import { Component, Inject, OpaqueToken, EventEmitter, Input, Output, OnInit } from 'ng-metadata/core';
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
    selector: 'team-edit-form',
    template: require('./_edit.html'),
    styles: require('./team.scss'),
    providers: [provideBackendService]
})
export class EditTeamFormComponent implements OnInit {

    @Output('onSave')
    onSave: EventEmitter<Team> = new EventEmitter<Team>();
    @Input()
    team: Team;
    constructor(
        @Inject(TEAM_BACKEND_SERVICE) private backendService: BackendService<Team>,
        @Inject('$mdBottomSheet') private $mdBottomSheet: ng.material.IBottomSheetService,
        @Inject('$state') private $state: ng.ui.IStateService
    ) {

    }

    ngOnInit() {
        this.team = angular.copy(this.team);
    }

    submit() {
        this.backendService.update(this.team)
            .subscribe(() => {
                this.onSave.emit(this.team);
                this.$mdBottomSheet.hide('saved');
            });
    }
}
