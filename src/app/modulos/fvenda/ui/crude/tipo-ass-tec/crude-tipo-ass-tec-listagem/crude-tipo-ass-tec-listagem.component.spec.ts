import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoAssTecListagemComponent } from './crude-tipo-ass-tec-listagem.component';

describe('CrudeTipoAssTecListagemComponent', () => {
  let component: CrudeTipoAssTecListagemComponent;
  let fixture: ComponentFixture<CrudeTipoAssTecListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoAssTecListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoAssTecListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
