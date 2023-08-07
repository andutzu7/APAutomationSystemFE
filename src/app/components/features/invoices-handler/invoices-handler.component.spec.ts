import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesHandlerComponent } from './invoices-handler.component';

describe('InvoicesHandlerComponent', () => {
  let component: InvoicesHandlerComponent;
  let fixture: ComponentFixture<InvoicesHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesHandlerComponent]
    });
    fixture = TestBed.createComponent(InvoicesHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
