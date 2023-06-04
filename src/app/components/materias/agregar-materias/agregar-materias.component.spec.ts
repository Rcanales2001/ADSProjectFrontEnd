import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMateriasComponent } from './agregar-materias.component';

describe('AgregarMateriasComponent', () => {
  let component: AgregarMateriasComponent;
  let fixture: ComponentFixture<AgregarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
