import { Injectable } from 'ng-metadata/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { PouchDBBackendService, DexieBackendService } from '../../commons/services/backend';
import { Team, TeamMockModel } from '../../commons/models';

import Dexie from 'dexie';
@Injectable()
export class TeamBackendMockService extends DexieBackendService<TeamMockModel, number>  {
    getTable(): Dexie.Table<TeamMockModel, number> {
        return this.db.teams;
    }

    keyComposer(obj: TeamMockModel) {
        return obj.name;
    }

    getAll(params?: any): Observable<TeamMockModel[]> {
        let collection: Dexie.Collection<TeamMockModel, number> = this.getTable().orderBy('name');

        if (params && params.pagination) {
            collection  =  this.applyPaginationParams(collection, params.pagination);
        }

        let promiseGetAll: Dexie.Promise<TeamMockModel[]> = collection.toArray();
        let observable: Observable<TeamMockModel[]> = Observable.create((observer: Observer<TeamMockModel[]>) => {
            promiseGetAll.then((res: TeamMockModel[]) => {
                observer.next(res);
                observer.complete();

            })
        });

        return observable;
    }
    private applyPaginationParams(
        collection: Dexie.Collection<TeamMockModel, number>,
        pagination: any
    ): Dexie.Collection<TeamMockModel, number> {
        if ( pagination ) {
            if (pagination.limit) {
                collection = collection.limit(pagination.limit);
            }
            if (pagination.offset) {
                collection = collection.offset(pagination.offset);
            }
        }
        return collection;
    }
}


// export class TeamBackendMockService extends LokiJsBackendService<TeamMockModel>  {
//     afterInit() {

//     }

//     getCollectionName(): string {
//         return 'team';
//     }

//     getIndices(): string[] {
//         return ['name'];
//     }

//     getUniques(): string[] {
//         return ['name'];
//     }
// }
// export class TeamBackendMockService extends PouchDBBackendService<TeamMockModel>  {

//     constructor() {
//         super();
//     }

//     getDbName(): string {
//         return 'teams';
//     }

//     keyComposer(obj: TeamMockModel) {
//         if (obj && obj.name) {
//             return obj.name.toLowerCase();
//         } else {
//             return null;
//         }
//     }

//     afterInit() {
//         // (<any>this.db).createIndex({
//         //     index: {
//         //         fields: ['name'],
//         //         name: 'myindex',
//         //         ddoc: 'mydesigndoc',
//         //         type: 'json'
//         //     }
//         // }
//         // ).then(function (result) {
//         //     console.info('index created');
//         // }).catch(function (err) {
//         //     console.warn('error creating index', err);
//         // });
//         let ddoc = {
//             _id: '_design/index',
//             views: {
//                 index: {
//                     map: function mapFun(doc, emit) {
//                         if (doc.name) {
//                             emit(doc.name);
//                         }
//                     }.toString()
//                 }
//             }
//         }

//         this.db.put(ddoc);
//     }

//     getAll(): Observable<TeamMockModel[]> {
//         // let findResult: Promise<pDB.Response.IFind> = this.db.find(
//         //     {
//         //         selector: {
//         //             name: { '$exists': true }
//         //         },
//         //         fields: ['name'],
//         //         sort: ['name']
//         //     }
//         // );
//         let findResult = this.db.query('index', { include_docs: true });
//         let observable = Observable.create((observer: Observer<TeamMockModel[]>) => {
//             findResult
//                 .then((value: PouchRes.IFind) => {
//                     console.log('Query Result', value);
//                     observer.next(value.docs);
//                     observer.complete();
//                 })
//                 .catch(error => observer.error(error));

//         });
//         return observable;
//     }

//     getAllSortedByName() {
//         (<any>this.db).query((doc, emit) => {
//             emit()
//         })
//     }
// }
