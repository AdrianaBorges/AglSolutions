import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCanalVendaListagemComponent } from './crude-canal-venda-listagem.component';

describe('CrudeCanalVendaListagemComponent', () => {
  let component: CrudeCanalVendaListagemComponent;
  let fixture: ComponentFixture<CrudeCanalVendaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCanalVendaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCanalVendaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
