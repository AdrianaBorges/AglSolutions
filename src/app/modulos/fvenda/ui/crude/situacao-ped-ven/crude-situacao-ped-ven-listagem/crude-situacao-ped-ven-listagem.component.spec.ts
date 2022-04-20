import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSituacaoPedVenListagemComponent } from './crude-situacao-ped-ven-listagem.component';

describe('CrudeSituacaoPedVenListagemComponent', () => {
  let component: CrudeSituacaoPedVenListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoPedVenListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoPedVenListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoPedVenListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
