import { Component, Inject, OpaqueToken, provide } from 'ng-metadata/core';
import { BackendService } from '../../commons/services/backend';
import { Team } from '../../commons/models';

import { TeamBackendRestService } from './rest.service';
import { TeamBackendMockService } from './mock.service';

export const TEAM_BACKEND_SERVICE = new OpaqueToken('TEAM_BACKEND_SERVICE');

// let provideBackendService: any = provide(TEAM_BACKEND_SERVICE, {
//     useClass: TeamBackendRestService
// });

// if (ENV === 'prototyping') {
//     provideBackendService = provide(TEAM_BACKEND_SERVICE, {
//         useClass: TeamBackendMockService
//     });
// }

@Component({
    selector: 'team-show',
    template: require('./_show.html'),
    styles: require('./team.scss')
    // ,
    // providers: [ ...provideBackendService ]
})
export class TeamShowComponent {
    constructor(
       //  @Inject(TEAM_BACKEND_SERVICE) backendService: BackendService<Team>
    ) {

    }
}
