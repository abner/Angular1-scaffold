import { TEAM_BACKEND_SERVICE } from './backend.service';
import { TeamBackendRestService } from './rest.service';
import { TeamBackendMockService } from './mock.service';

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

export const TEAM_BACKEND_SERVICE_PROVIDE = provideBackendService;
