import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeMotRejPedCompListagemComponent } from './crude-mot-rej-ped-comp-listagem.component';

describe('CrudeMotRejPedCompListagemComponent', () => {
  let component: CrudeMotRejPedCompListagemComponent;
  let fixture: ComponentFixture<CrudeMotRejPedCompListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeMotRejPedCompListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMotRejPedCompListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
