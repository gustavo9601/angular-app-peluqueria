import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingsComponent } from './list-bookings.component';

describe('ListBookingsComponent', () => {
  let component: ListBookingsComponent;
  let fixture: ComponentFixture<ListBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
