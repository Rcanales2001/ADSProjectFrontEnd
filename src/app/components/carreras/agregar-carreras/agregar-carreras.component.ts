import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Carrera } from '../../../models/carreras.interface';
import { CarrerasService } from '../../../services/carreras.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/utils/Utilities';

@Component({
  selector: 'app-agregar-carreras',
  templateUrl: './agregar-carreras.component.html',
  styleUrls: ['./agregar-carreras.component.css']
})
export class AgregarCarrerasComponent {

  form!: FormGroup;
  formCarrera: Carrera;
  onRouteStart!: Subscription;
  idCarrera!: number;

  constructor(private formBuilder: FormBuilder, private carreraService:
    CarrerasService, private router: Router, private activedRoute: ActivatedRoute, private location: Location) {
    this.formCarrera = {} as Carrera;
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [' ', [Validators.required, Validators.pattern('[\\S]{1,}[\\S\\s]*|[\\s]*[\\S]{1,}[\\S\\s]*')]],
      nombre: [' ', [Validators.required, Validators.pattern('[\\S]{1,}[\\S\\s]*|[\\s]*[\\S]{1,}[\\S\\s]*')]]
    });

    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      this.idCarrera = temp['idCarrera'];
    });

    if (this.idCarrera && this.idCarrera > 0) {
      this.carreraService.getCarreraPorID(this.idCarrera).subscribe({
        next: (temp) => {
          this.formCarrera = temp;
          this.form.controls['codigo'].setValue(this.formCarrera.codigoCarrera);
          this.form.controls['nombre'].setValue(this.formCarrera.nombreCarrera);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    // Asignacion de valores
    this.formCarrera.codigoCarrera = this.form.get('codigo')?.value;
    this.formCarrera.nombreCarrera = this.form.get('nombre')?.value;
    // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion
    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    if (this.idCarrera && this.idCarrera > 0) {
      this.carreraService.updateCarrera(this.idCarrera, this.formCarrera
      ).subscribe({
        // Respuesta exitosa
        next: (temp) => {
          // Navegar hacia atras
          //this.router.navigate(['']);
          Swal.fire("Actualizado", "Registro actualizado con exito", "success");

          this.location.back()
        },
        // En caso de error
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar carrera',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.carreraService.postCarrera(this.formCarrera).subscribe({
        // Respuesta exitosa
        next: (temp) => {
          // Navegar hacia atras
          //this.router.navigate(['']);
          Swal.fire("Registrado", "Registro insertado con éxito", "success");

          this.location.back()
        },
        // En caso de error
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar carrera',
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
