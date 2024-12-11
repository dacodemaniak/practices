import { Observable, of } from "rxjs";
import { ModelStrategyInterface } from "../../core/strategies/model-strategy-interface";
import { ProductModel } from "../models/product-model";

export class EmptyModelStrategy implements ModelStrategyInterface<ProductModel>{
    getModel(id?: number): Observable<ProductModel> {
        return of(new ProductModel())
    }
    
}
