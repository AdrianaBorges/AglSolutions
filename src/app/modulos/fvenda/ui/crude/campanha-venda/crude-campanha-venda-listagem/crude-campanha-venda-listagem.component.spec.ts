import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCampanhaVendaListagemComponent } from './crude-campanha-venda-listagem.component';

describe('CrudeCampanhaVendaListagemComponent', () => {
  let component: CrudeCampanhaVendaListagemComponent;
  let fixture: ComponentFixture<CrudeCampanhaVendaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCampanhaVendaListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCampanhaVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
