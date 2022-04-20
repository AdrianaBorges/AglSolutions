import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoCampanhaDetalheComponent } from './crude-tipo-campanha-detalhe.component';

describe('CrudeTipoCampanhaDetalheComponent', () => {
  let component: CrudeTipoCampanhaDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoCampanhaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoCampanhaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCampanhaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
