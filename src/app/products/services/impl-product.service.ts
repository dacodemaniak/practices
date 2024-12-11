import { Injectable } from '@angular/core';
import { ProductService } from './product-service';
import { ProductModel } from '../models/product-model';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable, of, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImplProductService implements ProductService<ProductModel> {
  private endPoint = 'http://localhost:3000/products'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(
      this.endPoint
    )
    .pipe(
      take(1),
      map((anyProducts: any[]) => {
        return anyProducts.map((anyProduct: any) => {
          const product: ProductModel = new ProductModel()
          Object.assign(product, anyProduct)
          return product
        })
      })
    )
  }

  findOne(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(
      this.endPoint + '/' + id
    )
    .pipe(
      take(1),
      catchError((error: any) => throwError(() => new Error('Something went wrong !'))),
      map((anyProduct) => {
        const product: ProductModel = new ProductModel()
        return Object.assign(product, anyProduct)
      })
    )
  }

  add(data: any): void {
    const _data = {
      id: data.id.toString(),
      label: data.label
    }
    this.httpClient.post<ProductModel>(
      this.endPoint,
      _data
    ).subscribe()
  }

  update(data: any): void {
    this.httpClient.put<ProductModel>(
      this.endPoint + '/' + data.id,
      data
    ).subscribe()
  }
}
