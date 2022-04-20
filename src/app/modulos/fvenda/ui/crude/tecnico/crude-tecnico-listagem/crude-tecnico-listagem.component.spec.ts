import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTecnicoListagemComponent } from './crude-tecnico-listagem.component';

describe('CrudeTecnicoListagemComponent', () => {
  let component: CrudeTecnicoListagemComponent;
  let fixture: ComponentFixture<CrudeTecnicoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTecnicoListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTecnicoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
