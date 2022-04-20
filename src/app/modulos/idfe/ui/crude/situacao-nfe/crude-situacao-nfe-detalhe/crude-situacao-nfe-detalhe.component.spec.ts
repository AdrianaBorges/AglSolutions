import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeSituacaoNfeDetalheComponent } from './crude-situacao-nfe-detalhe.component';

describe('CrudeSituacaoNfeDetalheComponent', () => {
  let component: CrudeSituacaoNfeDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoNfeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoNfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoNfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
