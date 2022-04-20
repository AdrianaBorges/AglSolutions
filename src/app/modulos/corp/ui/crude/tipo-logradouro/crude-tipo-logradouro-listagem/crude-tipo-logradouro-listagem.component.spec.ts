import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoLogradouroListagemComponent } from './crude-tipo-logradouro-listagem.component';

describe('CrudeTipoLogradouroListagemComponent', () => {
  let component: CrudeTipoLogradouroListagemComponent;
  let fixture: ComponentFixture<CrudeTipoLogradouroListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoLogradouroListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoLogradouroListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
