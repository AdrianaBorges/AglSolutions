import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoAprovaPvListagemComponent } from './crude-situacao-aprova-pv-listagem.component';

describe('CrudeSituacaoAprovaPvListagemComponent', () => {
  let component: CrudeSituacaoAprovaPvListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoAprovaPvListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoAprovaPvListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoAprovaPvListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
