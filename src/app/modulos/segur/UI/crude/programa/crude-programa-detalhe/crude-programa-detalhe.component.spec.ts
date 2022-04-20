import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeProgramaDetalheComponent } from './crude-programa-detalhe.component';

describe('CrudeProgramaDetalheComponent', () => {
  let component: CrudeProgramaDetalheComponent;
  let fixture: ComponentFixture<CrudeProgramaDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeProgramaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeProgramaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
