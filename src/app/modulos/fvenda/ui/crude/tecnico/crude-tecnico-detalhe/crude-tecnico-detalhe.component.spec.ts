import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTecnicoDetalheComponent } from './crude-tecnico-detalhe.component';

describe('CrudeTecnicoDetalheComponent', () => {
  let component: CrudeTecnicoDetalheComponent;
  let fixture: ComponentFixture<CrudeTecnicoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTecnicoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTecnicoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
