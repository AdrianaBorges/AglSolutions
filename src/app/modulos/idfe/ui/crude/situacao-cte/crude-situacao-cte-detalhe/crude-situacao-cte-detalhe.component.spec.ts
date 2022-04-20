import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeSituacaoCteDetalheComponent } from './crude-situacao-cte-detalhe.component';

describe('CrudeSituacaoCteDetalheComponent', () => {
  let component: CrudeSituacaoCteDetalheComponent;
  let fixture: ComponentFixture<CrudeSituacaoCteDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoCteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoCteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
