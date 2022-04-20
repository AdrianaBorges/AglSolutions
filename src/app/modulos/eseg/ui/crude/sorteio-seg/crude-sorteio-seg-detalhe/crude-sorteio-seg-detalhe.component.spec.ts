import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSorteioSegDetalheComponent } from './crude-sorteio-seg-detalhe.component';

describe('CrudeSorteioSegDetalheComponent', () => {
  let component: CrudeSorteioSegDetalheComponent;
  let fixture: ComponentFixture<CrudeSorteioSegDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSorteioSegDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSorteioSegDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
