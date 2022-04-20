import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCidadeDetalheComponent } from './crude-cidade-detalhe.component';

describe('CrudeCidadeDetalheComponent', () => {
  let component: CrudeCidadeDetalheComponent;
  let fixture: ComponentFixture<CrudeCidadeDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCidadeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCidadeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
