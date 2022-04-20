import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeEspecieItemListagemComponent } from './crude-especie-item-listagem.component';

describe('CrudeEspecieItemListagemComponent', () => {
  let component: CrudeEspecieItemListagemComponent;
  let fixture: ComponentFixture<CrudeEspecieItemListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeEspecieItemListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeEspecieItemListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
