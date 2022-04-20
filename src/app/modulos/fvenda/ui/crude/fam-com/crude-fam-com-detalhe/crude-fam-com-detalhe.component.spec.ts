import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeFamComDetalheComponent } from './crude-fam-com-detalhe.component';

describe('CrudeFamComDetalheComponent', () => {
  let component: CrudeFamComDetalheComponent;
  let fixture: ComponentFixture<CrudeFamComDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeFamComDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeFamComDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
