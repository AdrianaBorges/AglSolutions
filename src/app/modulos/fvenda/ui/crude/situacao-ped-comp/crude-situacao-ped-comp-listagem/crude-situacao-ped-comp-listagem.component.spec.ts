import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSituacaoPedCompListagemComponent } from './crude-situacao-ped-comp-listagem.component';

describe('CrudeSituacaoPedCompListagemComponent', () => {
  let component: CrudeSituacaoPedCompListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoPedCompListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoPedCompListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoPedCompListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
