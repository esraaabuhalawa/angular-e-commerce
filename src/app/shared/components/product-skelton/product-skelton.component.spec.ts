import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSkeltonComponent } from './product-skelton.component';

describe('ProductSkeltonComponent', () => {
  let component: ProductSkeltonComponent;
  let fixture: ComponentFixture<ProductSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSkeltonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
