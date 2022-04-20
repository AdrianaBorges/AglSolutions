import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoMenuOpcaoDetalheComponent } from './crude-tipo-menu-opcao-detalhe.component';

describe('CrudeTipoMenuOpcaoDetalheComponent', () => {
  let component: CrudeTipoMenuOpcaoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoMenuOpcaoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoMenuOpcaoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoMenuOpcaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
