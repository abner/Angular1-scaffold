import { Component, Inject, ChangeDetectionStrategy } from 'ng-metadata/core';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../../commons/models';
import { BackendService } from '../../../commons/services/backend';
import { TEAM_BACKEND_SERVICE, TEAM_BACKEND_SERVICE_PROVIDE } from '../../team';

@Component({
    selector: 'my-team-box',
    template: require('./_myTeamsBox.html'),
    providers: [
        TEAM_BACKEND_SERVICE_PROVIDE
    ],
    styles: require('./myTeamBox.scss'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTeamsBoxComponent {
    teams: Observable<Team[]> = null;
    constructor(
        @Inject(TEAM_BACKEND_SERVICE) private teamBackendService: BackendService<Team>
    ) {
        this.teams = teamBackendService.getAll();

        teamBackendService.onChanges().subscribe(() => {
            this.teams = teamBackendService.getAll();
        });
    }
}
