import { Observable } from "rxjs";

export interface ModelStrategyInterface<T> {
    getModel(id?: number): Observable<T>
}
