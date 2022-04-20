import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePagadorJuridicaComponent } from './crude-pagador-juridica.component';

describe('CrudePagadorJuridicaComponent', () => {
  let component: CrudePagadorJuridicaComponent;
  let fixture: ComponentFixture<CrudePagadorJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePagadorJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePagadorJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
