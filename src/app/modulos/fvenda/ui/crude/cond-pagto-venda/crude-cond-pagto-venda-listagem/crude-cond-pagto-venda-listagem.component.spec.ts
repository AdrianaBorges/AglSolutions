import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCondPagtoVendaListagemComponent } from './crude-cond-pagto-venda-listagem.component';

describe('CrudeCondPagtoVendaListagemComponent', () => {
  let component: CrudeCondPagtoVendaListagemComponent;
  let fixture: ComponentFixture<CrudeCondPagtoVendaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrudeCondPagtoVendaListagemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCondPagtoVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
