import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeCtoCorSegDetalheComponent } from './crude-cto-cor-seg-detalhe.component';

describe('CrudeCtoCorSegDetalheComponent', () => {
  let component: CrudeCtoCorSegDetalheComponent;
  let fixture: ComponentFixture<CrudeCtoCorSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeCtoCorSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeCtoCorSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
