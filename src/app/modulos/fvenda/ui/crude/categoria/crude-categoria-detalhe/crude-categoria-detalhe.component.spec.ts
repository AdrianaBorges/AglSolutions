import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCategoriaDetalheComponent } from './crude-categoria-detalhe.component';

describe('CrudeCategoriaDetalheComponent', () => {
  let component: CrudeCategoriaDetalheComponent;
  let fixture: ComponentFixture<CrudeCategoriaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCategoriaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCategoriaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
