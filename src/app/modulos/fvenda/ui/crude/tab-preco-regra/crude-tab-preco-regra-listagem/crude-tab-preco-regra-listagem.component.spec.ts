import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTabPrecoRegraListagemComponent } from './crude-tab-preco-regra-listagem.component';

describe('CrudeTabPrecoRegraListagemComponent', () => {
  let component: CrudeTabPrecoRegraListagemComponent;
  let fixture: ComponentFixture<CrudeTabPrecoRegraListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTabPrecoRegraListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTabPrecoRegraListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
