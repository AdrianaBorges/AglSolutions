import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsGrupoDeUsuarioComponent } from './tabs-grupo-de-usuario.component';

describe('TabsGrupoDeUsuarioComponent', () => {
  let component: TabsGrupoDeUsuarioComponent;
  let fixture: ComponentFixture<TabsGrupoDeUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabsGrupoDeUsuarioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsGrupoDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
