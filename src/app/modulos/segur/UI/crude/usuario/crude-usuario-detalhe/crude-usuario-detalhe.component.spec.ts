import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeUsuarioDetalheComponent } from './crude-usuario-detalhe.component';

describe('CrudeUsuarioDetalheComponent', () => {
  let component: CrudeUsuarioDetalheComponent;
  let fixture: ComponentFixture<CrudeUsuarioDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeUsuarioDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeUsuarioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
