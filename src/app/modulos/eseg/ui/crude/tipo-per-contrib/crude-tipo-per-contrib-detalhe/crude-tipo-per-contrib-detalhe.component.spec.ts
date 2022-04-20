import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPerContribDetalheComponent } from './crude-tipo-per-contrib-detalhe.component';

describe('CrudeTipoPerContribDetalheComponent', () => {
  let component: CrudeTipoPerContribDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoPerContribDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPerContribDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPerContribDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
