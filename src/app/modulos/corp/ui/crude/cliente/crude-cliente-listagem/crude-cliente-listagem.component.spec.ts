import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeClienteListagemComponent } from './crude-cliente-listagem.component';

describe('CrudeClienteListagemComponent', () => {
  let component: CrudeClienteListagemComponent;
  let fixture: ComponentFixture<CrudeClienteListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeClienteListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeClienteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
