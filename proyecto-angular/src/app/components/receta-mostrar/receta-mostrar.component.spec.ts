import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaMostrarComponent } from './receta-mostrar.component';

describe('RecetaMostrarComponent', () => {
  let component: RecetaMostrarComponent;
  let fixture: ComponentFixture<RecetaMostrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetaMostrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
