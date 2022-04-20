import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCoberturaSegDetalheComponent } from './crude-cobertura-seg-detalhe.component';

describe('CrudeCoberturaSegDetalheComponent', () => {
  let component: CrudeCoberturaSegDetalheComponent;
  let fixture: ComponentFixture<CrudeCoberturaSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCoberturaSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCoberturaSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
