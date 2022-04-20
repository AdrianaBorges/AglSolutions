import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoCapitalSegListagemComponent } from './crude-tipo-capital-seg-listagem.component';

describe('CrudeTipoCapitalSegListagemComponent', () => {
  let component: CrudeTipoCapitalSegListagemComponent;
  let fixture: ComponentFixture<CrudeTipoCapitalSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoCapitalSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoCapitalSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
