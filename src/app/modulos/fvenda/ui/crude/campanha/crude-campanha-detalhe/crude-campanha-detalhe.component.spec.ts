import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCampanhaDetalheComponent } from './crude-campanha-detalhe.component';

describe('CrudeCampanhaDetalheComponent', () => {
  let component: CrudeCampanhaDetalheComponent;
  let fixture: ComponentFixture<CrudeCampanhaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCampanhaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCampanhaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
