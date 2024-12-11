import { AbstractControl, FormGroup } from "@angular/forms";
import { ProductService } from "../../products/services/product-service";
import { ProductModel } from "../../products/models/product-model";

export abstract class AbstractForm {
    protected _form: FormGroup = new FormGroup({})

    protected _controls: Map<string, AbstractControl> = new Map()
   

    get form(): FormGroup {
        this._controls.forEach((control: AbstractControl, name: string) => {
            this._form.addControl(name, control)
        })
        return this._form
    }

    get c(): {[key: string]: AbstractControl} {
        return this._form.controls
    }

    /**
     * Implements this method to handle form submission
     */
    abstract onSubmit(): void

    abstract setForm(): void

    abstract setService(service: any): void
    
    addControl(controlName: string, control: AbstractControl): AbstractForm {
        this._controls.set(controlName, control)
        return this
    }
}
