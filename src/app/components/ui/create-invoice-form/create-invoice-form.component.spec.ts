import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvoiceFormComponent } from './create-invoice-form.component';

describe('CreateInvoiceFormComponent', () => {
  let component: CreateInvoiceFormComponent;
  let fixture: ComponentFixture<CreateInvoiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInvoiceFormComponent]
    });
    fixture = TestBed.createComponent(CreateInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
