import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeOrigemCrListagemComponent } from './crude-origem-cr-listagem.component';

describe('CrudeOrigemCrListagemComponent', () => {
  let component: CrudeOrigemCrListagemComponent;
  let fixture: ComponentFixture<CrudeOrigemCrListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeOrigemCrListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeOrigemCrListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
