import { Inject, Injectable, EventEmitter } from 'ng-metadata/core';

let slug = require('slug');
let PouchDB: pDB.IPouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('pouchdb:find')
import { BackendService } from './backend-service.interface';


import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export interface Change<T> {

}

export abstract class PouchDBBackendService<T extends pDB.IBaseDoc> implements BackendService<T> {

    private _onChange: EventEmitter<T> = new EventEmitter<T>(true);

    protected db: pDB.IPouchDB;
    protected changes: pDB.IPouchDBOn;

    constructor() {
        this.db = new PouchDB(this.getDbName());
        this.changes = this.db.changes({
            include_docs: true,
            live: true,
            since: 'now'
        });
        this.afterInit();
    }

    abstract getDbName(): string;

    abstract afterInit();

    abstract keyComposer(obj: T): string;

    buildSlug(obj): string {
        return slug(this.keyComposer(obj));
    }


    onChanges(): Observable<T> {
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this._onChange.subscribe((change: string, value: T) => {
                observer.next(value);
            });
        });
        return observable;
    }

    findOne(id: number): Observable<T> {
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this.db.get<T>(id.toString())
                .then((res: T) => {
                    observer.next(res);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                });
        });

        return observable;
    }


    insert(obj: T): Observable<T> {
        obj._id = this.buildSlug(obj);
        let insertPromise: Promise<pDB.Response.IOk> = this.db.put<T>(obj);
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            insertPromise
                .then((res: pDB.Response.IOk) => {
                    observer.next(obj);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                });
        });

        return observable;
    }

    update(obj: T): Observable<T> {
        obj._id = this.buildSlug(obj);
        let updatePromise: Promise<pDB.Response.IOk> = this.db.put<T>(obj);
        let observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            updatePromise
                .then((res: pDB.Response.IOk) => {
                    observer.next(obj);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                });
        });

        return observable;
    }

    delete(obj: T): Observable<boolean> {
        let deletePromise: Promise<pDB.Response.IOk> = this.db.remove<T>(obj);
        let observable: Observable<boolean> = Observable.create((observer: Observer<boolean>) => {
            deletePromise
                .then((res: pDB.Response.IOk) => {
                    observer.next(true);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                });
        });

        return observable;
    }

    getAll(): Observable<T[]> {
        let observable: Observable<T[]> = Observable.create((observer: Observer<T[]>) => {
            let results: T[] = [];
            this.db.allDocs<T>({ include_docs: true })
                .then((res: pDB.Response.IBatchFetch<T>) => {
                    res.rows.forEach((value: pDB.Response.IBatchDoc<T>) => {
                        results.push(value.doc);
                    });
                    observer.next(results);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                    observer.complete();
                });
        });

        return observable;
    }

    query(params: any): Observable<T[]> {
        return Observable.of(<T[]> []);
    }

    count(): Observable<number> {
        let observable: Observable<number> = Observable.create((observer: Observer<number>) => {
            this.db.allDocs<T>()
                .then(res => {
                    observer.next(res.total_rows);
                    observer.complete()
                })
                .catch((e) => {
                    observer.error(e);
                    observer.complete();
                });
        });

        return observable;
    }
}
