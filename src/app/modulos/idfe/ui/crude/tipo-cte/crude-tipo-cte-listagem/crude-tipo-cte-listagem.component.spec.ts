import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeTipoCteListagemComponent } from './crude-tipo-cte-listagem.component';

describe('CrudeTipoCteListagemComponent', () => {
  let component: CrudeTipoCteListagemComponent;
  let fixture: ComponentFixture<CrudeTipoCteListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
