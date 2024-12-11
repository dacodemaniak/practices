import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { AbstractForm } from "../../core/utilities/abstract-form";
import { ImplProductService } from "../services/impl-product.service";
import { ModelStrategyInterface } from "../../core/strategies/model-strategy-interface";
import { ProductModel } from "../models/product-model";
import { Observable } from "rxjs";
import { EmptyModelStrategy } from "../strategies/empty-model-strategy";
import { NonEmptyModelStrategy } from "../strategies/non-empty-model-strategy";

export class ProductForm extends AbstractForm {
    private _service?: ImplProductService
    private _strategy: ModelStrategyInterface<ProductModel> = new EmptyModelStrategy()
    private _updateMode: boolean = false

    constructor() {
        super()
    }

    set strategy(strategy: ModelStrategyInterface<ProductModel>) {
        this._strategy = strategy
    }
    
    override onSubmit(): void {
        if (!this._updateMode)
            this._service?.add(this._form.value)
        else
            this._service?.update(this._form.getRawValue())
    }

    override setService(service: any): void {
        this._service = service
    }

    setForm(id?: number): void {
        let model: ProductModel | Observable<ProductModel>
        model = this._strategy.getModel(id)

        this._updateMode = (id) ? true : false

        const idControl: AbstractControl = new FormControl()
        idControl.addValidators([Validators.required, Validators.min(1)])
        

        const labelControl: AbstractControl = new FormControl()
        labelControl.addValidators([Validators.required])
        

        this.addControl(
            'id',
             idControl
        )
        .addControl(
            'label',
            labelControl
        )

            model.subscribe({
                next: (product: ProductModel) => {
                    idControl.setValue(product.id)
                    if (this._updateMode) {
                        idControl.disable()
                    }
                    labelControl.setValue(product.label)
                },
                error: (error: any) => {
                    throw new Error(`Product was not found`)
                }
            })
    }
}
