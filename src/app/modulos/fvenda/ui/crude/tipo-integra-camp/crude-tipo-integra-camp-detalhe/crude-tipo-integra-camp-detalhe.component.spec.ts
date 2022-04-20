import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoIntegraCampDetalheComponent } from './crude-tipo-integra-camp-detalhe.component';

describe('CrudeTipoIntegraCampDetalheComponent', () => {
  let component: CrudeTipoIntegraCampDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoIntegraCampDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoIntegraCampDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoIntegraCampDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
