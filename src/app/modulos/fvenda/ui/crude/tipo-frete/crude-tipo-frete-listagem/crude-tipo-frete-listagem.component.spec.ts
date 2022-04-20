import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoFreteListagemComponent } from './crude-tipo-frete-listagem.component';

describe('CrudeTipoFreteListagemComponent', () => {
  let component: CrudeTipoFreteListagemComponent;
  let fixture: ComponentFixture<CrudeTipoFreteListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoFreteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoFreteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
