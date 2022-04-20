import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoContaBancoListagemComponent } from './crude-tipo-conta-banco-listagem.component';

describe('CrudeTipoContaBancoListagemComponent', () => {
  let component: CrudeTipoContaBancoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoContaBancoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoContaBancoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoContaBancoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
