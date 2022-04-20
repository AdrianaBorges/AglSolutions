import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsSeguradoJuridicaComponent } from './tabs-segurado-juridica.component';

describe('TabsSeguradoJuridicaComponent', () => {
  let component: TabsSeguradoJuridicaComponent;
  let fixture: ComponentFixture<TabsSeguradoJuridicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsSeguradoJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSeguradoJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
