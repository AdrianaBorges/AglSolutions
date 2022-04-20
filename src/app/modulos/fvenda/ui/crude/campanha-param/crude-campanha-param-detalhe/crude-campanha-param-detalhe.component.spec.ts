import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeCamapanhaParamDetalheComponent } from './crude-campanha-param-detalhe.component';

describe('CrudeCamapanhaParamDetalheComponent', () => {
  let component: CrudeCamapanhaParamDetalheComponent;
  let fixture: ComponentFixture<CrudeCamapanhaParamDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeCamapanhaParamDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCamapanhaParamDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
