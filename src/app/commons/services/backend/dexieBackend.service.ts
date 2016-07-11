import { Inject, Injectable, EventEmitter } from 'ng-metadata/core';

let slug = require('slug');

import { APP_PREFIX } from '../../../app.component';

import Dexie from 'dexie';


import { BackendService } from './backendService.interface';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export interface Change<T> {

}

import { DexieDatabase } from './dexieDatabase';

export abstract class DexieBackendService<T, K> implements BackendService<T> {

    private _onChange: EventEmitter<T> = new EventEmitter<T>(true);
    protected db: DexieDatabase;
    protected changes: LokiCollectionChange;

    constructor() {
        this.db = new DexieDatabase();
    }


    abstract getTable(): Dexie.Table<T, K>;

    abstract keyComposer(obj: T): string;

    buildSlug(obj): string {
        return slug(this.keyComposer(obj));
    }

    onChanges(): Observable<Change<T>> {
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this._onChange.subscribe((change: string, value: T) => {
                observer.next(value);
            });
        });
        return observable;
    }



    findOne(id: number): Observable<T> {
        let promiseGet: Promise<T> = this.getTable().get(<any> id);
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            promiseGet.then((res: T) => {
                observer.next(res);
                observer.complete();

            })
        });

        return observable;
    }


    insert(obj: T): Observable<T> {
        let promisePut: Dexie.Promise<K> = this.getTable().put(obj);
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            promisePut.then((res: K) => {
                observer.next(obj);
                observer.complete();
                this._onChange.emit(obj);

            })
        });

        return observable;
    }

    update(obj: T): Observable<T> {
        let promisePut: Dexie.Promise<K> = this.getTable().put(obj);
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            promisePut.then((res: K) => {
                observer.next(obj);
                observer.complete();
                this._onChange.emit(obj);

            })
        });

        return observable;
    }

    delete(obj: T): Observable<boolean> {
        let promiseDelete: Dexie.Promise<void> = this.getTable().delete(<K> obj['id']);
        let observer: Observer<boolean>;
        let observable: Observable<boolean> = Observable.create((observer: Observer<boolean>) => {
            observer = observer;
        });

        promiseDelete.then((res) => {
            this._onChange.emit(<any> {});
            observer.next(true);
            observer.complete();

        }).catch((e) => observer.error('Delete error: ' +  e));

        return observable;
    }

    getAll(): Observable<T[]> {
        let promiseGetAll: Dexie.Promise<T[]> = this.getTable().toArray();
        let observable: Observable<T[]> = Observable.create((observer: Observer<T[]>) => {
            promiseGetAll.then((res: T[]) => {
                observer.next(res);
                observer.complete();
            })
        });

        return observable;
    }

    query(params: any): Observable<T[]> {
        return Observable.of(<T[]> []);
    }

    count(): Observable<number> {
        let promiseCount: Dexie.Promise<number> = this.getTable().count();
        let observable: Observable<number> = Observable.create((observer: Observer<number>) => {
            promiseCount.then((res: number) => {
                observer.next(res);
                observer.complete();

            })
        });

        return observable;
    }
}
