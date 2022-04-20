import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoUsuarioDetalheComponent } from './crude-tipo-usuario-detalhe.component';

describe('CrudeTipoUsuarioDetalheComponent', () => {
  let component: CrudeTipoUsuarioDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoUsuarioDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoUsuarioDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoUsuarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
