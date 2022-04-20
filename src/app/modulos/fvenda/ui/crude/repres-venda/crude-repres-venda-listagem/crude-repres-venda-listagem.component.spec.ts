import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRepresVendaListagemComponent } from './crude-repres-venda-listagem.component';

describe('CrudeRepresVendaListagemComponent', () => {
  let component: CrudeRepresVendaListagemComponent;
  let fixture: ComponentFixture<CrudeRepresVendaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRepresVendaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRepresVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
