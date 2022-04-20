import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoCteDetalheComponent } from './crude-tipo-cte-detalhe.component';

describe('CrudeTipoCteDetalheComponent', () => {
  let component: CrudeTipoCteDetalheComponent;
  let fixture: ComponentFixture<CrudeTipoCteDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
