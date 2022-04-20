import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCampanhaListagemComponent } from './crude-campanha-listagem.component';

describe('CrudeCampanhaListagemComponent', () => {
  let component: CrudeCampanhaListagemComponent;
  let fixture: ComponentFixture<CrudeCampanhaListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCampanhaListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCampanhaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
