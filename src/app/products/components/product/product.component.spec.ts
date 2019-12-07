import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductComponent } from './product.component';
import { Product } from 'src/app/core/models/product';
import { TranslateModule } from '@ngx-translate/core';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let detailsEl: DebugElement;
  let buyBtn: DebugElement;
  let detailsBtn: DebugElement;
  const expectedProduct = new Product(1, 'test title', 'test author', new Date(), 'test desc', 7, true, 5, '');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [TranslateModule.forRoot()]
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    detailsEl = fixture.debugElement.query(By.css('.price-details'));
    buyBtn = fixture.debugElement.query(By.css('.btn-add > .hidden-sm'));
    detailsBtn = fixture.debugElement.query(By.css('.btn-details > .hidden-sm'));
  });

  it('should display product details', () => {
    component.product = expectedProduct;

    fixture.detectChanges();

    expect(detailsEl.nativeElement.textContent).toContain(expectedProduct.title);
  });

  it('should raise onBuy event when clicked', () => {
    let selectedProduct: Product;
    component.product = expectedProduct;

    fixture.detectChanges();

    component.buy.subscribe((product: Product) => (selectedProduct = product));

    buyBtn.triggerEventHandler('click', null);
    expect(selectedProduct).toBe(expectedProduct);
  });

  it('should raise onShowDetails event when clicked', () => {
    let selectedId: number;
    component.product = expectedProduct;

    fixture.detectChanges();

    component.details.subscribe((id: number) => (selectedId = id));

    detailsBtn.triggerEventHandler('click', null);
    expect(selectedId).toBe(expectedProduct.id);
  });
});
