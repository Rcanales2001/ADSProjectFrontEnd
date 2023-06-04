import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Estudiante } from '../../../models/estudiantes.interface';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/utils/Utilities';


@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.css']
})

export class AgregarEstudianteComponent {
  // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
  form!: FormGroup;
  // Creacion de objeto que se enviara a traves del endpoint
  formEstudiante: Estudiante;
  // Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
  // Variable que almacena el ID del estudiante
  idEstudiante!: number;

  constructor(private formBuilder: FormBuilder, private estudianteService:
    EstudiantesService, private router: Router, private activedRoute: ActivatedRoute, private location: Location) {
    // Se inicializa el objeto estudiante que se enviara
    this.formEstudiante = {} as Estudiante;
  }
  ngOnInit(): void {
    // Se inicia el controlador del formulario
    this.form = this.formBuilder.group({
      codigo: [' ', [Validators.required]],
      nombres: [' ', [Validators.required]],
      apellidos: [' ', [Validators.required]],
      correo: [' ', [Validators.required, Validators.email]]
    });

    // Se inicializa el observable de ruta
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
      this.idEstudiante = temp['idEstudiante'];
    });

    // Se valida que el valor del idEstudiante sea mayor a cero y distinto de nulo.
    if (this.idEstudiante && this.idEstudiante > 0) {
      // Es edicion
      // Se consulta la informacion del estudiante, para rellenar el formulario
      this.estudianteService.getEstudiantePorID(this.idEstudiante).subscribe({
        next: (temp) => {
          this.formEstudiante = temp;
          // Se rellena la informacion del formulario
          this.form.controls['codigo'].setValue(this.formEstudiante.codigo);
          this.form.controls['nombres'].setValue(this.formEstudiante.nombres);
          this.form.controls['apellidos'].setValue(this.formEstudiante.apellidos);
          this.form.controls['correo'].setValue(this.formEstudiante.email);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    // Asignacion de valores
    this.formEstudiante.codigo = this.form.get('codigo')?.value;
    this.formEstudiante.nombres = this.form.get('nombres')?.value;
    this.formEstudiante.apellidos = this.form.get('apellidos')?.value;
    this.formEstudiante.email = this.form.get('correo')?.value;

    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion
    if (this.idEstudiante && this.idEstudiante > 0) {
      this.estudianteService.updateEstudiante(this.idEstudiante, this.formEstudiante
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
            title: 'Error al actualizar persona',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.estudianteService.postEstudiante(this.formEstudiante).subscribe({
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
            title: 'Error al insertar persona',
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
