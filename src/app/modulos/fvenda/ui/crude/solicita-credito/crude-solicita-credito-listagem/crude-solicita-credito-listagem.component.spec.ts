import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSolicitaCreditoListagemComponent } from './crude-solicita-credito-listagem.component';

describe('CrudeSolicitaCreditoListagemComponent', () => {
  let component: CrudeSolicitaCreditoListagemComponent;
  let fixture: ComponentFixture<CrudeSolicitaCreditoListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSolicitaCreditoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicitaCreditoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
