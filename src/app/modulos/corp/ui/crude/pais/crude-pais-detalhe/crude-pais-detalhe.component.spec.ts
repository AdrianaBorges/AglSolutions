import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudePaisDetalheComponent } from './crude-pais-detalhe.component';

describe('CrudePaisDetalheComponent', () => {
  let component: CrudePaisDetalheComponent;
  let fixture: ComponentFixture<CrudePaisDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudePaisDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudePaisDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
