import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTabPrecoListagemComponent } from './crude-tab-preco-listagem.component';

describe('CrudeTabPrecoListagemComponent', () => {
  let component: CrudeTabPrecoListagemComponent;
  let fixture: ComponentFixture<CrudeTabPrecoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTabPrecoListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTabPrecoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
