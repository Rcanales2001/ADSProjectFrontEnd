import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Materia } from '../../../models/materias.interface';
import { Location } from '@angular/common';
import { MateriasService } from '../../../services/materias.service';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/utils/Utilities';

@Component({
  selector: 'app-agregar-materias',
  templateUrl: './agregar-materias.component.html',
  styleUrls: ['./agregar-materias.component.css']
})
export class AgregarMateriasComponent {

  form!: FormGroup;
  formMateria: Materia;
  onRouteStart!: Subscription;
  idMateria!: number;

  constructor(private formBuilder: FormBuilder, private materiaService: MateriasService, private router: Router, private activedRoute: ActivatedRoute, private location: Location) {
    this.formMateria = {} as Materia;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [' ', [Validators.required, Validators.pattern('[\\S]{1,}[\\S\\s]*|[\\s]*[\\S]{1,}[\\S\\s]*')]]
    });

    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      this.idMateria = temp['idMateria'];
    });

    if (this.idMateria && this.idMateria > 0) {
      this.materiaService.getMateriaPorID(this.idMateria).subscribe({
        next: (temp) => {
          this.formMateria = temp;
          this.form.controls['nombre'].setValue(this.formMateria.nombre);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    // Asignacion de valores
    this.formMateria.nombre = this.form.get('nombre')?.value;
    // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion
    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    if (this.idMateria && this.idMateria > 0) {
      this.materiaService.updateMateria(this.idMateria, this.formMateria
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
            title: 'Error al actualizar materia',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.materiaService.postMateria(this.formMateria).subscribe({
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
            title: 'Error al insertar materia',
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
