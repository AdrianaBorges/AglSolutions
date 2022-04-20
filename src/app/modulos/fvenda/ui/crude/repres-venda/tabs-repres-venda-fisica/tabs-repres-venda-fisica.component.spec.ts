import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsRepresVendaFisicaComponent } from './tabs-repres-venda-fisica.component';

describe('TabsRepresVendaFisicaComponent', () => {
  let component: TabsRepresVendaFisicaComponent;
  let fixture: ComponentFixture<TabsRepresVendaFisicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRepresVendaFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRepresVendaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
