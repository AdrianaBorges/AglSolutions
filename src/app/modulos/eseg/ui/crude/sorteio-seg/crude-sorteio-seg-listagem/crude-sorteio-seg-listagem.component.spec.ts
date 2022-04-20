import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudeSorteioSegListagemComponent } from './crude-sorteio-seg-listagem.component';

describe('CrudeSorteioSegListagemComponent', () => {
  let component: CrudeSorteioSegListagemComponent;
  let fixture: ComponentFixture<CrudeSorteioSegListagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudeSorteioSegListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeSorteioSegListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
