import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsClienteVendaJuridicaComponent } from './tabs-cliente-venda-juridica.component';

describe('TabsClienteVendaJuridicaComponent', () => {
  let component: TabsClienteVendaJuridicaComponent;
  let fixture: ComponentFixture<TabsClienteVendaJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsClienteVendaJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsClienteVendaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
