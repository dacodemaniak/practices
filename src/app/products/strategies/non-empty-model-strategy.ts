import { Observable } from "rxjs";
import { ModelStrategyInterface } from "../../core/strategies/model-strategy-interface";
import { ProductModel } from "../models/product-model";
import { ProductService } from "../services/product-service";
import { ImplProductService } from "../services/impl-product.service";

export class NonEmptyModelStrategy implements ModelStrategyInterface<ProductModel>{
    private _service: ProductService<ProductModel>

    constructor(
        _service: ImplProductService
    ) {
        this._service = _service
    }
    getModel(id?: any): Observable<ProductModel> {
        const _id: number = parseInt(id)
        return this._service.findOne(_id)
    }
}
