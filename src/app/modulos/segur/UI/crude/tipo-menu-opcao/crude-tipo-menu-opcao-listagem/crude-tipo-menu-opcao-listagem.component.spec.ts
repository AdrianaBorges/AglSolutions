import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoMenuOpcaoListagemComponent } from './crude-tipo-menu-opcao-listagem.component';

describe('CrudeTipoMenuOpcaoListagemComponent', () => {
  let component: CrudeTipoMenuOpcaoListagemComponent;
  let fixture: ComponentFixture<CrudeTipoMenuOpcaoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoMenuOpcaoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoMenuOpcaoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
