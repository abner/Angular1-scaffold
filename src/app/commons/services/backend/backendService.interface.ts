import { Observable } from 'rxjs/Observable';

export interface Change<T> {

}

export interface BackendService<T> {
    getAll(params?: any): Observable<T[]>;
    onChanges(): Observable<Change<T>>;
    findOne(id: number): Observable<T>;
    insert(obj: T): Observable<T>;
    update(obj: T): Observable<T>;
    delete(obj: T): Observable<boolean>;
    count(params?: any): Observable<number>;
    query(params?: any): Observable<T[]>;
}
