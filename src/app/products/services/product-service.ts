import { HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"

export interface ProductService<T> {
    /**
     * @returns should return an array of T
     */
    findAll(): Observable<Array<T>>

    /**
     * Should return a T
     * @param id
     * @throws Exception if T was not found
     */
    findOne(id: number): Observable<T>
}
