import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeClienteVendaListagemComponent } from './crude-cliente-venda-listagem.component';

describe('CrudeClienteVendaListagemComponent', () => {
  let component: CrudeClienteVendaListagemComponent;
  let fixture: ComponentFixture<CrudeClienteVendaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeClienteVendaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeClienteVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
