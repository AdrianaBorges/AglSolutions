import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeGruposDoUsuarioDetalheComponent } from './crude-grupos-do-usuario-detalhe.component';

describe('CrudeGruposDoUsuarioDetalheComponent', () => {
  let component: CrudeGruposDoUsuarioDetalheComponent;
  let fixture: ComponentFixture<CrudeGruposDoUsuarioDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeGruposDoUsuarioDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeGruposDoUsuarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
