import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoFaturaCRListagemComponent } from './crude-tipo-fatura-cr-listagem.component';

describe('CrudeTipoFaturaCRListagemComponent', () => {
  let component: CrudeTipoFaturaCRListagemComponent;
  let fixture: ComponentFixture<CrudeTipoFaturaCRListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoFaturaCRListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoFaturaCRListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
