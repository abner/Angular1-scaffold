import { Component, Inject, ChangeDetectionStrategy } from 'ng-metadata/core';
import { Observable } from 'rxjs/Observable';
import { BackendService } from '../../../commons/services/backend';

// import { Project } from '../../../commons/models';
// import { PROJECT_BACKEND_SERVICE, PROJECT_BACKEND_SERVICE_PROVIDE } from '../../project';

@Component({
    selector: 'my-project-box',
    template: require('./_myProjects.html'),
    providers: [
        // PROJECT_BACKEND_SERVICE_PROVIDE
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProjectsBoxComponent {
    // projects: Observable<Project[]> = null;
    constructor(
        // @Inject(PROJECT_BACKEND_SERVICE) private projectBackendService: BackendService<Project>
    ) {
        // this.projects = projectBackendService.getAll();

        // projectBackendService.onChanges().subscribe(() => {
        //     this.project = projectBackendService.getAll();
        // });
    }
}
