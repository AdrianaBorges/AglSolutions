import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrupoClienteDetalheComponent } from './crude-grupo-cliente-detalhe.component';

describe('CrudeGrupoClienteDetalheComponent', () => {
  let component: CrudeGrupoClienteDetalheComponent;
  let fixture: ComponentFixture<CrudeGrupoClienteDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrupoClienteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoClienteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
