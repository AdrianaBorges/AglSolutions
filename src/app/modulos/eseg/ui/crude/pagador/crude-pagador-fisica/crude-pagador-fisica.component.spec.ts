import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePagadorFisicaComponent } from './crude-pagador-fisica.component';

describe('CrudePagadorFisicaComponent', () => {
  let component: CrudePagadorFisicaComponent;
  let fixture: ComponentFixture<CrudePagadorFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePagadorFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePagadorFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
