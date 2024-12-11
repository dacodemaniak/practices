import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractForm } from '../../core/utilities/abstract-form';
import { ProductForm } from '../utilities/product-form';
import { ImplProductService } from '../services/impl-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NonEmptyModelStrategy } from '../strategies/non-empty-model-strategy';

@Component({
  selector: 'app-product-handler',
  templateUrl: './product-handler.component.html',
  styleUrl: './product-handler.component.scss'
})
export class ProductHandlerComponent {
  form: FormGroup = new FormGroup({})

  private _abstractForm: AbstractForm = new ProductForm()

  constructor(
    private _service: ImplProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._abstractForm.setService(_service)
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: any) => {
      const id: any = params.get('id')
      if (id) {
        (this._abstractForm as ProductForm).strategy = new NonEmptyModelStrategy(this._service);
        (this._abstractForm as ProductForm).setForm(id)
      } else {
        this._abstractForm.setForm()
      }
      this.form = this._abstractForm.form
    })
  }

  onSubmit(): void {
    this._abstractForm.onSubmit()
    this._router.navigate(['/', 'products'])
  }

  get c(): {[key: string]: AbstractControl} {
    return this._abstractForm.c
  }
}
