import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeRacaCorListagemComponent } from './crude-raca-cor-listagem.component';

describe('CrudeRacaCorListagemComponent', () => {
  let component: CrudeRacaCorListagemComponent;
  let fixture: ComponentFixture<CrudeRacaCorListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeRacaCorListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeRacaCorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
