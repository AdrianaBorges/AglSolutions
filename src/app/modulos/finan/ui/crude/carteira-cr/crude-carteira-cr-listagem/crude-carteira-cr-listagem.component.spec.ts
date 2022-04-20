import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCarteiraCrListagemComponent } from './crude-carteira-cr-listagem.component';

describe('CrudeCarteiraCrListagemComponent', () => {
  let component: CrudeCarteiraCrListagemComponent;
  let fixture: ComponentFixture<CrudeCarteiraCrListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCarteiraCrListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCarteiraCrListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
