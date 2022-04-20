import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoDefeitoDetalheComponent } from './crude-tipo-defeito-detalhe.component';

describe('CrudeTipoDefeitoDetalheComponent', () => {
  let component: CrudeTipoDefeitoDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoDefeitoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoDefeitoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoDefeitoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
