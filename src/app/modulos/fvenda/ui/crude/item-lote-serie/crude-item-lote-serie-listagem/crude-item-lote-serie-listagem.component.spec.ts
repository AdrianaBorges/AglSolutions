import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeItemLoteSerieListagemComponent } from './crude-item-lote-serie-listagem.component';

describe('CrudeItemLoteSerieListagemComponent', () => {
  let component: CrudeItemLoteSerieListagemComponent;
  let fixture: ComponentFixture<CrudeItemLoteSerieListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeItemLoteSerieListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeItemLoteSerieListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
