import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlaundryPage } from './inlaundry.page';

describe('InlaundryPage', () => {
  let component: InlaundryPage;
  let fixture: ComponentFixture<InlaundryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlaundryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlaundryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
