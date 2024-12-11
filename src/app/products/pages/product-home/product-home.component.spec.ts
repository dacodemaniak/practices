import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomeComponent } from './product-home.component';
import { SharedModule } from '../../../shared/shared.module';
import { ImplProductService } from '../../services/impl-product.service';

describe('ProductHomeComponent', () => {
  let component: ProductHomeComponent;
  let fixture: ComponentFixture<ProductHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductHomeComponent],
      imports: [
        SharedModule
      ],
      providers: [
        ImplProductService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
