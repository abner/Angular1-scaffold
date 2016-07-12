import { Component, Inject, ChangeDetectionStrategy } from 'ng-metadata/core';
import { Observable } from 'rxjs/Observable';
import { BackendService } from '../../../commons/services/backend';

// import { Task } from '../../../commons/models';
// import { TASK_BACKEND_SERVICE, TASK_BACKEND_SERVICE_PROVIDE } from '../../task';

@Component({
    selector: 'my-task-box',
    template: require('./_myTasks.html'),
    providers: [
        // TASK_BACKEND_SERVICE
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTasksBoxComponent {
    // teams: Observable<Task[]> = null;
    constructor(
        @Inject('$http') private $http: ng.IHttpService
        // @Inject(TASK_BACKEND_SERVICE) private taskBackendService: BackendService<Task>
    ) {
        this.$http.get('https://restcountries.eu/rest/v1/all')
        .then((response) => {
        });
        // this.tasks = taskBackendService.getAll();

        // taskBackendService.onChanges().subscribe(() => {
        //     this.tasks = taskBackendService.getAll();
        // });
    }
}
