import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompaniesComponent } from './view-companies.component';

describe('ViewCompaniesComponent', () => {
  let component: ViewCompaniesComponent;
  let fixture: ComponentFixture<ViewCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCompaniesComponent]
    });
    fixture = TestBed.createComponent(ViewCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
