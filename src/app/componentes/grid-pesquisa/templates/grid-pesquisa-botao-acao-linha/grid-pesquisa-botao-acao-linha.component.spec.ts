import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridPesquisaBotaoAcaoLinhaComponent } from './grid-pesquisa-botao-acao-linha.component';

describe('GridPesquisaBotaoAcaoLinhaComponent', () => {
  let component: GridPesquisaBotaoAcaoLinhaComponent;
  let fixture: ComponentFixture<GridPesquisaBotaoAcaoLinhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPesquisaBotaoAcaoLinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPesquisaBotaoAcaoLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
