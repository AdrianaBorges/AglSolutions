import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeSitAtenPedCompListagemComponent } from './crude-sit-aten-ped-comp-listagem.component';

describe('CrudeSitAtenPedCompListagemComponent', () => {
  let component: CrudeSitAtenPedCompListagemComponent;
  let fixture: ComponentFixture<CrudeSitAtenPedCompListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeSitAtenPedCompListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSitAtenPedCompListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
