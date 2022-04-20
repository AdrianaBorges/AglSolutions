import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoMovtoCRListagemComponent } from './crude-tipo-movto-cr-listagem.component';

describe('CrudeTipoMovtoCRListagemComponent', () => {
  let component: CrudeTipoMovtoCRListagemComponent;
  let fixture: ComponentFixture<CrudeTipoMovtoCRListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoMovtoCRListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoMovtoCRListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
