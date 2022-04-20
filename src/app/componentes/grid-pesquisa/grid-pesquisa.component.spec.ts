import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridPesquisaComponent } from './grid-pesquisa.component';

describe('GridPesquisaComponent', () => {
  let component: GridPesquisaComponent;
  let fixture: ComponentFixture<GridPesquisaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
