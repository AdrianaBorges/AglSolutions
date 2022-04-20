import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeTipoPerContribListagemComponent } from './crude-tipo-per-contrib-listagem.component';

describe('CrudeTipoPerContribListagemComponent', () => {
  let component: CrudeTipoPerContribListagemComponent;
  let fixture: ComponentFixture<CrudeTipoPerContribListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeTipoPerContribListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoPerContribListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
