import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoSeguroListagemComponent } from './crude-tipo-seguro-listagem.component';

describe('CrudeTipoSeguroListagemComponent', () => {
  let component: CrudeTipoSeguroListagemComponent;
  let fixture: ComponentFixture<CrudeTipoSeguroListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoSeguroListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoSeguroListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
