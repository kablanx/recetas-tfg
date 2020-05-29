import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesBandejaComponent } from './mensajes-bandeja.component';

describe('MensajesBandejaComponent', () => {
  let component: MensajesBandejaComponent;
  let fixture: ComponentFixture<MensajesBandejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesBandejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesBandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
