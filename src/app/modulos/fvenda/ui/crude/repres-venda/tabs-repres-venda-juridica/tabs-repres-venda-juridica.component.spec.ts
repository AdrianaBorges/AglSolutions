import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsRepresVendaJuridicaComponent } from './tabs-repres-venda-juridica.component';

describe('TabsRepresVendaJuridicaComponent', () => {
  let component: TabsRepresVendaJuridicaComponent;
  let fixture: ComponentFixture<TabsRepresVendaJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRepresVendaJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRepresVendaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
