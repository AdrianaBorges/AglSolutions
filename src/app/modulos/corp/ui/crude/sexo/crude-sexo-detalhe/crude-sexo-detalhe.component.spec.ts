import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSexoDetalheComponent } from './crude-sexo-detalhe.component';

describe('CrudeSexoDetalheComponent', () => {
  let component: CrudeSexoDetalheComponent;
  let fixture: ComponentFixture<CrudeSexoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSexoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSexoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
