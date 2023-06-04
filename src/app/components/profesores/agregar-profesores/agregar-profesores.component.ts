import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profesor } from '../../../models/profesores.interface';
import { Location } from '@angular/common';
import { ProfesoresService } from '../../../services/profesores.service';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/utils/Utilities';

@Component({
  selector: 'app-agregar-profesores',
  templateUrl: './agregar-profesores.component.html',
  styleUrls: ['./agregar-profesores.component.css']
})

export class AgregarProfesoresComponent {

  form!: FormGroup;
  formProfesor: Profesor;
  onRouteStart!: Subscription;
  idProfesor!: number;

  constructor(private formBuilder: FormBuilder, private ProfesorService: ProfesoresService, private router: Router, private activedRoute: ActivatedRoute, private location: Location) {
    this.formProfesor = {} as Profesor;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombres: [' ', [Validators.required]],
      apellidos: [' ', [Validators.required]],
      email: [' ', [Validators.required, Validators.email]],

    });

    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      this.idProfesor = temp['idProfesor'];
    });

    if (this.idProfesor && this.idProfesor > 0) {
      this.ProfesorService.getProfesorPorID(this.idProfesor).subscribe({
        next: (temp: Profesor) => {
          this.formProfesor = temp;
          this.form.controls['nombres'].setValue(this.formProfesor.nombres);
          this.form.controls['apellidos'].setValue(this.formProfesor.apellidos);
          this.form.controls['email'].setValue(this.formProfesor.email);
        },
        error: (err: any) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    // Asignacion de valores
    this.formProfesor.nombres = this.form.get('nombres')?.value;
    this.formProfesor.apellidos = this.form.get('apellidos')?.value;
    this.formProfesor.email = this.form.get('email')?.value;

    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();


    // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion
    if (this.idProfesor && this.idProfesor > 0) {
      this.ProfesorService.updateProfesor(this.idProfesor, this.formProfesor
      ).subscribe({
        // Respuesta exitosa
        next: (temp: any) => {
          // Navegar hacia atras
          //this.router.navigate(['']);
          Swal.fire("Actualizado", "Registro actualizado con exito", "success");
          this.location.back()
        },
        // En caso de error
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar profesor',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.ProfesorService.postProfesor(this.formProfesor).subscribe({
        // Respuesta exitosa
        next: (temp: any) => {
          // Navegar hacia atras
          //this.router.navigate(['']);
          Swal.fire("Registrado", "Registro insertado con éxito", "success");
          this.location.back()
        },
        // En caso de error
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar profesor',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    }
  }
  /* Funcion que permite validar los campos del formulario
  trabaja evaluando si el campo ha sido manipulado o esta vacio*/
  validateField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

}
