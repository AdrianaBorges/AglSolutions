import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeTabPrecoItemListagemComponent } from './crude-tab-preco-item-listagem.component';

describe('CrudeTabPrecoItemListagemComponent', () => {
  let component: CrudeTabPrecoItemListagemComponent;
  let fixture: ComponentFixture<CrudeTabPrecoItemListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeTabPrecoItemListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeTabPrecoItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
