import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeFinalidadeNfeDetalheComponent } from './crude-finalidade-nfe-detalhe.component';

describe('CrudeFinalidadeNfeDetalheComponent', () => {
  let component: CrudeFinalidadeNfeDetalheComponent;
  let fixture: ComponentFixture<CrudeFinalidadeNfeDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFinalidadeNfeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFinalidadeNfeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
