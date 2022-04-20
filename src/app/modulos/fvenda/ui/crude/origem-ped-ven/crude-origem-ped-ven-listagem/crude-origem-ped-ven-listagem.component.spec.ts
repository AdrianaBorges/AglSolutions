import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeOrigemPedVenListagemComponent } from './crude-origem-ped-ven-listagem.component';

describe('CrudeOrigemPedVenListagemComponent', () => {
  let component: CrudeOrigemPedVenListagemComponent;
  let fixture: ComponentFixture<CrudeOrigemPedVenListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeOrigemPedVenListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeOrigemPedVenListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
