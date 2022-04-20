import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEmpresaListagemComponent } from './crude-empresa-listagem.component';

describe('CrudeEmpresaListagemComponent', () => {
  let component: CrudeEmpresaListagemComponent;
  let fixture: ComponentFixture<CrudeEmpresaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEmpresaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEmpresaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
