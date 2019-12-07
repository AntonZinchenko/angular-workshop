import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductsFacadeService } from 'src/app/+store/products/facade';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from 'src/app/core/models/product';
import { of } from 'rxjs';
import { ProductComponent } from '../../components/product/product.component';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './router-stubs';

const testProducts = [new Product(1, 'test title', 'test author', new Date(), 'test desc', 7, true, 5, '')];

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let  productsFacadeService: ProductsFacadeService;
  let  getProductsSpy: jasmine.Spy;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductComponent],
      providers: [
        ProductsFacadeService,
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot({})
      ]
    });

    fixture = TestBed.createComponent(ProductListComponent);

    productsFacadeService = fixture.debugElement.injector.get(ProductsFacadeService);
    getProductsSpy = spyOn(productsFacadeService, 'getAllProducts').and.returnValue(
      of(testProducts)
    );
  });

  it('should not show products before OnInit', () => {
    expect(getProductsSpy.calls.any()).toBe(false, 'productsFacadeService.getAllProducts() not yet called');
  });

  it('should show products after component initialized', () => {
    fixture.detectChanges();
    expect(getProductsSpy.calls.any()).toBe(true, 'productsFacadeService.getAllProducts() called');
  });
});
