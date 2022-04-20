import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridPesquisaContainerBotoesAcaoLinhaComponent } from './grid-pesquisa-container-botoes-acao-linha.component';

describe('GridPesquisaContainerBotoesAcaoLinhaComponent', () => {
  let component: GridPesquisaContainerBotoesAcaoLinhaComponent;
  let fixture: ComponentFixture<GridPesquisaContainerBotoesAcaoLinhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPesquisaContainerBotoesAcaoLinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPesquisaContainerBotoesAcaoLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
