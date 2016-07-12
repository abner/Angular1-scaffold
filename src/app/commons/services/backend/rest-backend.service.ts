import { Inject, Injectable, EventEmitter } from 'ng-metadata/core';

import { BackendService, Change } from './backend-service.interface';
import { Observable, Observer } from 'rxjs';

export abstract class RestBackendService<T> implements BackendService<T> {
    constructor(
        private $http: ng.IHttpService
    ) {

    }

    abstract getBaseUrl(): string;

    onChanges(): Observable<Change<T>> {
        return Observable.of([]);
    }

    buildUrl(path: string) {
        return this.getBaseUrl() + path;
    }

    findOne(id: number): Observable<T> {
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this.$http.get<T>(this.buildUrl(`/${id}`))
                .then(response => observer.next(response.data))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }

    insert(obj: T): Observable<T> {
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this.$http.post<T>(this.buildUrl('/'), obj)
                .then(response => observer.next(response.data))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }

    update(obj: T): Observable<T> {
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this.$http.put<T>(this.buildUrl(`/${obj['id']}`), obj)
                .then(response => observer.next(response.data))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }

    delete(obj: T): Observable<boolean> {
        let observable: Observable<boolean> = Observable.create((observer: Observer<boolean>) => {
            this.$http.delete<T>(this.buildUrl(`/${obj['id']}`), obj)
                .then(response => observer.next(true))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }

    getAll(): Observable<T[]> {
        let observable: Observable<T[]> = Observable.create((observer: Observer<T[]>) => {
            this.$http.get<T[]>(this.buildUrl('/'))
                .then(response => observer.next(response.data))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }

    query(params: any): Observable<T[]> {
        let observable: Observable<T[]> = Observable.create((observer: Observer<T[]>) => {
            this.$http.get<T[]>(this.buildUrl('/'), {
                data: params
            })
                .then(response => observer.next(response.data))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }

    count(): Observable<number> {
        let observable: Observable<number> = Observable.create((observer: Observer<number>) => {
            this.$http.head<T[]>(this.buildUrl('/'))
                .then(response => observer.next(Number.parseInt(response.headers('RESULT_COUNT'))))
                .catch(error => observer.error(error))
                .finally(() => observer.complete());
        });

        return observable;
    }
}
