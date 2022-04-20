import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeFormaCobrancaListagemComponent } from './crude-forma-cobranca-listagem.component';

describe('CrudeFormaCobrancaListagemComponent', () => {
  let component: CrudeFormaCobrancaListagemComponent;
  let fixture: ComponentFixture<CrudeFormaCobrancaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFormaCobrancaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFormaCobrancaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
