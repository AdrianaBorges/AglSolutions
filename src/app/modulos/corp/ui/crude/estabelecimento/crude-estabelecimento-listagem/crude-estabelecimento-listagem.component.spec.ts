import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEstabelecimentoListagemComponent } from './crude-estabelecimento-listagem.component';

describe('CrudeEstabelecimentoListagemComponent', () => {
  let component: CrudeEstabelecimentoListagemComponent;
  let fixture: ComponentFixture<CrudeEstabelecimentoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEstabelecimentoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEstabelecimentoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
