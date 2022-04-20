import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGrupoSeguroDetalheComponent } from './crude-grupo-seguro-detalhe.component';

describe('CrudeGrupoSeguroDetalheComponent', () => {
  let component: CrudeGrupoSeguroDetalheComponent;
  let fixture: ComponentFixture<CrudeGrupoSeguroDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGrupoSeguroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGrupoSeguroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
