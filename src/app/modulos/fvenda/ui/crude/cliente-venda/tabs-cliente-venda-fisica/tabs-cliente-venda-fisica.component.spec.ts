import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsClienteVendaFisicaComponent } from './tabs-cliente-venda-fisica.component';

describe('TabsClienteVendaFisicaComponent', () => {
  let component: TabsClienteVendaFisicaComponent;
  let fixture: ComponentFixture<TabsClienteVendaFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsClienteVendaFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsClienteVendaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
