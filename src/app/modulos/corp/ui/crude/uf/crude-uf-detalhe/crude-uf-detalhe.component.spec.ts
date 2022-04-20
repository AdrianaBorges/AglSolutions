import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeUfDetalheComponent } from './crude-uf-detalhe.component';

describe('CrudeUfDetalheComponent', () => {
  let component: CrudeUfDetalheComponent;
  let fixture: ComponentFixture<CrudeUfDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeUfDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeUfDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
