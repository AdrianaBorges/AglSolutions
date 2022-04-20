import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSegurancaProgramaListagemComponent } from './crude-seguranca-programa-listagem.component';

describe('CrudeSegurancaProgramaListagemComponent', () => {
  let component: CrudeSegurancaProgramaListagemComponent;
  let fixture: ComponentFixture<CrudeSegurancaProgramaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSegurancaProgramaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSegurancaProgramaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
