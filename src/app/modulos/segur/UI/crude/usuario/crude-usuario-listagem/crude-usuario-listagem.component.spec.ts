import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeUsuariosListagemComponent } from './crude-usuario-listagem.component';

describe('ListagemUsuariosComponent', () => {
  let component: CrudeUsuariosListagemComponent;
  let fixture: ComponentFixture<CrudeUsuariosListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeUsuariosListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeUsuariosListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
