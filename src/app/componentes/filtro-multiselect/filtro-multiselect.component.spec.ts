import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FiltroMultiselectComponent } from './filtro-multiselect.component';

describe('FiltroMultiselectComponent', () => {
  let component: FiltroMultiselectComponent;
  let fixture: ComponentFixture<FiltroMultiselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
