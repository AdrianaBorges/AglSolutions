import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSeguradoFisicaComponent } from './crude-segurado-fisica.component';

describe('CrudeSeguradoFisicaComponent', () => {
  let component: CrudeSeguradoFisicaComponent;
  let fixture: ComponentFixture<CrudeSeguradoFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSeguradoFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSeguradoFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
