import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeSituacaoCteListagemComponent } from './crude-situacao-cte-listagem.component';

describe('CrudeSituacaoCteListagemComponent', () => {
  let component: CrudeSituacaoCteListagemComponent;
  let fixture: ComponentFixture<CrudeSituacaoCteListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSituacaoCteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSituacaoCteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
