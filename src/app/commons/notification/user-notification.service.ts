import { Injectable, Inject } from 'ng-metadata/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class UserNotificationService {

    private defaultPosition: string = 'top right';
    private defaultDelay: number = 2000;
    constructor(
        @Inject('$mdToast') private $mdToast: ng.material.IToastService
    ) {


    }

    showNotification(message: string, position?: string, delay?: number): Observable<boolean> {

        let observable: Observable<boolean> = Observable.create((observer: Observer<boolean>) => {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(message)
                    .position(position || this.defaultPosition)
                    .hideDelay(delay || this.defaultDelay)
            )
                .then((ok) => {
                    observer.next(ok);
                })
                .catch((reason) => observer.error(reason))
                .finally(() => observer.complete())
        });

        return observable;
    }


}
