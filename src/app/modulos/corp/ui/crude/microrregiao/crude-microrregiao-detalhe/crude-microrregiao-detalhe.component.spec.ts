import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeMicrorregiaoDetalheComponent } from './crude-microrregiao-detalhe.component';

describe('CrudeMicrorregiaoDetalheComponent', () => {
  let component: CrudeMicrorregiaoDetalheComponent;
  let fixture: ComponentFixture<CrudeMicrorregiaoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeMicrorregiaoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeMicrorregiaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
