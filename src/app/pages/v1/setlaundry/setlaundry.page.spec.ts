import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlaundryPage } from './setlaundry.page';

describe('SetlaundryPage', () => {
  let component: SetlaundryPage;
  let fixture: ComponentFixture<SetlaundryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetlaundryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlaundryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
