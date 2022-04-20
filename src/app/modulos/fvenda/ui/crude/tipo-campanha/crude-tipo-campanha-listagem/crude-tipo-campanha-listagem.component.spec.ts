import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoCampanhaListagemComponent } from './crude-tipo-campanha-listagem.component';

describe('CrudeTipoCampanhaListagemComponent', () => {
  let component: CrudeTipoCampanhaListagemComponent;
  let fixture: ComponentFixture<CrudeTipoCampanhaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoCampanhaListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCampanhaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
