import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductHomeComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
