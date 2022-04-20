import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCamapanhaParamListagemComponent } from './crude-campanha-param-listagem.component';

describe('CrudeCamapanhaParamListagemComponent', () => {
  let component: CrudeCamapanhaParamListagemComponent;
  let fixture: ComponentFixture<CrudeCamapanhaParamListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCamapanhaParamListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCamapanhaParamListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
