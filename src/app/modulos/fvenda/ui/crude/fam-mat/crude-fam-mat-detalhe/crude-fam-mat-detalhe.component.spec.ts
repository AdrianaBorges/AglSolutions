import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeFamMatDetalheComponent } from './crude-fam-mat-detalhe.component';

describe('CrudeFamMatDetalheComponent', () => {
  let component: CrudeFamMatDetalheComponent;
  let fixture: ComponentFixture<CrudeFamMatDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFamMatDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFamMatDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
