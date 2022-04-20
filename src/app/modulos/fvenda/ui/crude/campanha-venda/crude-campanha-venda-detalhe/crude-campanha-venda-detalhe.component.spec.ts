import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCampanhaVendaDetalheComponent } from './crude-campanha-venda-detalhe.component';

describe('CrudeCampanhaVendaDetalheComponent', () => {
  let component: CrudeCampanhaVendaDetalheComponent;
  let fixture: ComponentFixture<CrudeCampanhaVendaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCampanhaVendaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCampanhaVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
