import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRenderer} from './invoice-renderer.component';

describe('InidividualInvoiceDialogComponent', () => {
  let component:InvoiceRenderer;
  let fixture: ComponentFixture<InvoiceRenderer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceRenderer]
    });
    fixture = TestBed.createComponent(InvoiceRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
