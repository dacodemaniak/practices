import { TestBed } from '@angular/core/testing';

import { ImplProductService } from './impl-product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductModel } from '../models/product-model';
import { SharedModule } from '../../shared/shared.module';

describe('ImplProductService', () => {
  let service: ImplProductService;
  let mockProducts: ProductModel[] = []
  let mockProduct: ProductModel
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ImplProductService)
    httpMock = TestBed.inject(HttpTestingController)

    mockProducts = [] // Avoid to add more than 2 product

    let product = new ProductModel()
    product.id = 1
    product.label = 'Product 1'
    mockProducts.push(product)

    mockProduct = {... product} // Testing one product

    product = new ProductModel()
    product.id = 2
    product.label = 'Product 2'
    mockProducts.push(product)

    
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('Should return 2 elements', (done) => {
    service.findAll().subscribe(reqProducts => {
      expect(reqProducts instanceof Array).toBeTruthy()
      expect(reqProducts).toHaveSize(2)
      expect(reqProducts[0].id).toBe(1)
      expect(reqProducts[0].label).toBe('Product 1');
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/products`);
    expect(req.request.method).toBe('GET')
    req.flush(mockProducts) // Mock datas !
  })


  it('should return a ProductModel when successful', (done) => {
    
    service.findOne(1).subscribe(reqProduct => {
      expect(reqProduct instanceof ProductModel).toBeTruthy();
      expect(reqProduct.id).toBe(1);
      expect(reqProduct.label).toBe('Product 1');
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  })

  it('should throw an error when HTTP request fails', (done) => {
    service.findOne(999).subscribe({
      next: () => {
        fail('should have failed with 404 error');
      },
      error: (error) => {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Something went wrong !')
        done();
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/999`);
    expect(req.request.method).toBe('GET');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  })
});
