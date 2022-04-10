import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpMPickerComponent } from './np-mpicker.component';

describe('NpxNpDatepickerComponent', () => {
  let component: NpMPickerComponent;
  let fixture: ComponentFixture<NpMPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpMPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpMPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
