import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsPessoaJuridicaComponent } from './tabs-pessoa-juridica.component';

describe('TabsPessoaJuridicaComponent', () => {
  let component: TabsPessoaJuridicaComponent;
  let fixture: ComponentFixture<TabsPessoaJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPessoaJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPessoaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
