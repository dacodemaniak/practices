import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductModel } from '../../models/product-model';
import { ImplProductService } from '../../services/impl-product.service';
import { Subscription } from 'rxjs';
import { ToggleType } from '../../types/toggle.type';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss'
})
export class ProductHomeComponent {
  products: Array<any> = []

  private _subscriptions: Subscription = new Subscription()

  constructor(
    private _productService: ImplProductService
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._productService.findAll()
      .subscribe({
        next: (_products: Array<ProductModel>) => {
          this.products = [... _products]
            .map((product: ProductModel) => ({... product, isSelected: false}))
        }
      })
    )
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  onToggle(event: ToggleType): void {
    const product = this.products.find((p: any) => p.id === event.id)
    product.isSelected = event.isSelected
  }
}
