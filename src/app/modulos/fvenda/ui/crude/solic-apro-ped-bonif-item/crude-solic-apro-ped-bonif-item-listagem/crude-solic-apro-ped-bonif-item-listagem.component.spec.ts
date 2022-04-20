import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSolicAproPedBonifItemListagemComponent } from './crude-solic-apro-ped-bonif-item-listagem.component';

describe('CrudeSolicAproPedBonifItemListagemComponent', () => {
  let component: CrudeSolicAproPedBonifItemListagemComponent;
  let fixture: ComponentFixture<CrudeSolicAproPedBonifItemListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSolicAproPedBonifItemListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicAproPedBonifItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
