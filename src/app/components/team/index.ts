import { TeamShowComponent } from './show.component';
export { TeamShowComponent } from './show.component';

import { AddTeamFormComponent } from './add-team-form.component';
export { AddTeamFormComponent } from './add-team-form.component';


import { EditTeamFormComponent } from './edit-team-form.component';
export { EditTeamFormComponent } from './edit-team-form.component';


import { TeamListComponent } from './team-list.component';
export { TeamListComponent } from './team-list.component';

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
