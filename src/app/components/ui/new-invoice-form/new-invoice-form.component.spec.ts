import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiceFormComponent } from './new-invoice-form.component';

describe('NewItemDialogComponent', () => {
  let component: NewInvoiceFormComponent;
  let fixture: ComponentFixture<NewInvoiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInvoiceFormComponent]
    });
    fixture = TestBed.createComponent(NewInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
