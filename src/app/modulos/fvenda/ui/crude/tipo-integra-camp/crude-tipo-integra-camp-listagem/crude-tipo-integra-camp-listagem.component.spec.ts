import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTipoIntegraCampListagemComponent } from './crude-tipo-integra-camp-listagem.component';

describe('CrudeTipoIntegraCampListagemComponent', () => {
  let component: CrudeTipoIntegraCampListagemComponent;
  let fixture: ComponentFixture<CrudeTipoIntegraCampListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTipoIntegraCampListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTipoIntegraCampListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
