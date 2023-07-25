import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseOrdersComponent } from './view-purchase-orders.component';

describe('ViewPurchaseOrdersComponent', () => {
  let component: ViewPurchaseOrdersComponent;
  let fixture: ComponentFixture<ViewPurchaseOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPurchaseOrdersComponent]
    });
    fixture = TestBed.createComponent(ViewPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
