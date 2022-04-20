import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSolicAproPedBonifListagemComponent } from './crude-solic-apro-ped-bonif-listagem.component';

describe('CrudeSolicAproPedBonifListagemComponent', () => {
  let component: CrudeSolicAproPedBonifListagemComponent;
  let fixture: ComponentFixture<CrudeSolicAproPedBonifListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSolicAproPedBonifListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSolicAproPedBonifListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
