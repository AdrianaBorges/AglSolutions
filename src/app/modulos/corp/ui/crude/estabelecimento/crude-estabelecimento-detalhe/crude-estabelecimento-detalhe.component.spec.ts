import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEstabelecimentoDetalheComponent } from './crude-estabelecimento-detalhe.component';

describe('CrudeEstabelecimentoDetalheComponent', () => {
  let component: CrudeEstabelecimentoDetalheComponent;
  let fixture: ComponentFixture<CrudeEstabelecimentoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEstabelecimentoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEstabelecimentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
