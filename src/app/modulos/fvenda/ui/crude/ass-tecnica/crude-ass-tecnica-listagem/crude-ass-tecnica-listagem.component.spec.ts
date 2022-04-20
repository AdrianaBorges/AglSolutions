import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeAssTecnicaListagemComponent } from './crude-ass-tecnica-listagem.component';

describe('CrudeAssTecnicaListagemComponent', () => {
  let component: CrudeAssTecnicaListagemComponent;
  let fixture: ComponentFixture<CrudeAssTecnicaListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeAssTecnicaListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAssTecnicaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
