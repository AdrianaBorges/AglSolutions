import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoTaxaSegListagemComponent } from './crude-tipo-taxa-seg-listagem.component';

describe('CrudeTipoTaxaSegListagemComponent', () => {
  let component: CrudeTipoTaxaSegListagemComponent;
  let fixture: ComponentFixture<CrudeTipoTaxaSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoTaxaSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoTaxaSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
