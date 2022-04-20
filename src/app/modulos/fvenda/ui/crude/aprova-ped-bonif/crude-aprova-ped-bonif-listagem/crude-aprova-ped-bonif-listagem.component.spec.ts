import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeAprovaPedBonifListagemComponent } from './crude-aprova-ped-bonif-listagem.component';

describe('CrudeAprovaPedBonifListagemComponent', () => {
  let component: CrudeAprovaPedBonifListagemComponent;
  let fixture: ComponentFixture<CrudeAprovaPedBonifListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeAprovaPedBonifListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeAprovaPedBonifListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
