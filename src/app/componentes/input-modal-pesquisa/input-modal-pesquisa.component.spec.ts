import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputModalPesquisaComponent } from './input-modal-pesquisa.component';

describe('InputModalPesquisaComponent', () => {
  let component: InputModalPesquisaComponent;
  let fixture: ComponentFixture<InputModalPesquisaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputModalPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputModalPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
