import { TeamShowComponent } from './show.component';
export { TeamShowComponent } from './show.component';

import { AddTeamFormComponent } from './addTeamForm.component';
export { AddTeamFormComponent } from './addTeamForm.component';


import { EditTeamFormComponent } from './editTeamForm.component';
export { EditTeamFormComponent } from './editTeamForm.component';


import { TeamListComponent } from './teamList.component';
export { TeamListComponent } from './teamList.component';

export const TEAM_COMPONENTS = [
    TeamShowComponent,
    AddTeamFormComponent,
    EditTeamFormComponent,
    TeamListComponent
];

export { TeamBackendMockService } from './mock.service';
export { TeamBackendRestService } from './rest.service';
export { TEAM_BACKEND_SERVICE } from './backend.service';
export { TEAM_BACKEND_SERVICE_PROVIDE } from './backend.service.provide';
