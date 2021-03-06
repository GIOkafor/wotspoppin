import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVenueComponent } from './create-venue.component';

describe('CreateVenueComponent', () => {
  let component: CreateVenueComponent;
  let fixture: ComponentFixture<CreateVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
