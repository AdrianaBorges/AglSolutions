import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeMotRejAprovaPvListagemComponent } from './crude-mot-rej-aprova-pv-listagem.component';

describe('CrudeMotRejAprovaPvListagemComponent', () => {
  let component: CrudeMotRejAprovaPvListagemComponent;
  let fixture: ComponentFixture<CrudeMotRejAprovaPvListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeMotRejAprovaPvListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMotRejAprovaPvListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
