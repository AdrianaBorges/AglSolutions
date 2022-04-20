import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeLogradouroListagemComponent } from './crude-logradouro-listagem.component';

describe('CrudeLogradouroListagemComponent', () => {
  let component: CrudeLogradouroListagemComponent;
  let fixture: ComponentFixture<CrudeLogradouroListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeLogradouroListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeLogradouroListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
