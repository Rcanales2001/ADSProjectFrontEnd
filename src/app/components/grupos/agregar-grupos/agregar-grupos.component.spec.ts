import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGruposComponent } from './agregar-grupos.component';

describe('AgregarGruposComponent', () => {
  let component: AgregarGruposComponent;
  let fixture: ComponentFixture<AgregarGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarGruposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
