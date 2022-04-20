import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';

import { CrudeFinalidadeNfeListagemComponent } from './crude-finalidade-nf-listagem.component';

describe('CrudeFinalidadeNfeListagemComponent', () => {
  let component: CrudeFinalidadeNfeListagemComponent;
  let fixture: ComponentFixture<CrudeFinalidadeNfeListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFinalidadeNfeListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFinalidadeNfeListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
