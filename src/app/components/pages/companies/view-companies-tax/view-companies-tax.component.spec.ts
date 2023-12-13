import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompaniesTaxComponent } from './view-companies-tax.component';

describe('ViewCompaniesTaxComponent', () => {
  let component: ViewCompaniesTaxComponent;
  let fixture: ComponentFixture<ViewCompaniesTaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCompaniesTaxComponent]
    });
    fixture = TestBed.createComponent(ViewCompaniesTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
