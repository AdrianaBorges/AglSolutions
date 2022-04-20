import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCanalVendaDetalheComponent } from './crude-canal-venda-detalhe.component';

describe('CrudeCanalVendaDetalheComponent', () => {
  let component: CrudeCanalVendaDetalheComponent;
  let fixture: ComponentFixture<CrudeCanalVendaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCanalVendaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCanalVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
