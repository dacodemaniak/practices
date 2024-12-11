import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductHomeComponent } from './pages/product-home/product-home.component';

@NgModule({
  imports: [RouterModule.forChild(ProductsRoutingModule.routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
  static routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: ProductHomeComponent
    }
  ]
}
