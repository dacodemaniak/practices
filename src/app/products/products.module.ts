import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductHomeComponent } from './pages/product-home/product-home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductHandlerComponent } from './product-handler/product-handler.component';


@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductHandlerComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
