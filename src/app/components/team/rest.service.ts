import { Injectable, Inject } from 'ng-metadata/core';
import { RestBackendService } from '../../commons/services/backend';
import { Team, TeamMockModel } from '../../commons/models';

@Injectable()
export class TeamBackendRestService extends RestBackendService<Team>  {

    constructor(@Inject('$http') $http) {
        super($http);
    }

    getBaseUrl(): string {
        return 'teams';
    }
}
