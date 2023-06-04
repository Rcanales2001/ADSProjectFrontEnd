import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Grupo } from '../../../models/grupos.interface';
import { Location } from '@angular/common';
import { GruposService } from '../../../services/grupos.service';
import { Carrera } from 'src/app/models/carreras.interface';
import { CarrerasService } from 'src/app/services/carreras.service';
import { Profesor } from 'src/app/models/profesores.interface';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { MateriasService } from 'src/app/services/materias.service';
import { Materia } from 'src/app/models/materias.interface';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/utils/Utilities';

@Component({
  selector: 'app-agregar-grupos',
  templateUrl: './agregar-grupos.component.html',
  styleUrls: ['./agregar-grupos.component.css']
})
export class AgregarGruposComponent {

  form!: FormGroup;
  formGrupo: Grupo;
  onRouteStart!: Subscription;
  idGrupo!: number;
  idCarrera!: number;
  lstCarreras: Carrera[];
  lstProfesores: Profesor[];
  lstMaterias: Materia[];

  constructor(private formBuilder: FormBuilder,
    private GrupoService: GruposService,
    private carreraService: CarrerasService,
    private materiasService: MateriasService,
    private profesorService: ProfesoresService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private location: Location) {
    this.formGrupo = {} as Grupo;
    this.lstCarreras = [];
    this.lstProfesores = [];
    this.lstMaterias = [];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCarrera: [' ', [Validators.required]],
      idMateria: [' ', [Validators.required]],
      idProfesor: [' ', [Validators.required]],
      ciclo: ['', [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
      //values for their radiobuttons
      carreraSeleccionada: [' '],
      materiaSeleccionada: [' '],
      profesorSeleccionado: [' '],
      //Values for confirmed and selected values
      lblCarreraSeleccionada: ['', [Validators.required]],
      lblMateriaSeleccionada: ['', [Validators.required]],
      lblProfesorSeleccionado: ['', [Validators.required]],



    });

    this.getAllCarreras();
    this.getAllProfesores();
    this.getAllMaterias();


    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      this.idGrupo = temp['idGrupo'];
    });

    if (this.idGrupo && this.idGrupo > 0) {
      this.GrupoService.getGrupoPorID(this.idGrupo).subscribe({
        next: (temp) => {
          this.formGrupo = temp;
          this.form.controls['carreraSeleccionada'].setValue(this.formGrupo.idCarrera);
          this.form.controls['materiaSeleccionada'].setValue(this.formGrupo.idCarrera);
          this.form.controls['profesorSeleccionado'].setValue(this.formGrupo.idProfesor);

          this.form.controls['lblCarreraSeleccionada'].setValue(this.formGrupo.idCarrera);
          this.form.controls['lblMateriaSeleccionada'].setValue(this.formGrupo.idCarrera);
          this.form.controls['lblProfesorSeleccionado'].setValue(this.formGrupo.idProfesor);

          this.form.controls['ciclo'].setValue(this.formGrupo.ciclo);
          this.form.controls['anio'].setValue(this.formGrupo.anio);



        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    // Asignacion de valores
    this.formGrupo.idCarrera = parseInt(this.form.get('lblCarreraSeleccionada')?.value);
    this.formGrupo.idMateria = parseInt(this.form.get('lblMateriaSeleccionada')?.value);
    this.formGrupo.idProfesor = parseInt(this.form.get('lblProfesorSeleccionado')?.value);
    this.formGrupo.ciclo = parseInt(this.form.get('ciclo')?.value);
    this.formGrupo.anio = parseInt(this.form.get('anio')?.value);

    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion
    if (this.idGrupo && this.idGrupo > 0) {
      this.GrupoService.updateGrupo(this.idGrupo, this.formGrupo
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
            title: 'Error al actualizar Grupo',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.GrupoService.postGrupo(this.formGrupo).subscribe({
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
            title: 'Error al insertar grupo',
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

  getAllCarreras() {
    this.carreraService.getListaCarreras().subscribe({
      next: (temp) => {
        this.lstCarreras = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion de las carreras");
      }
    })
  }

  getAllMaterias() {
    this.materiasService.getListaMaterias().subscribe({
      next: (temp) => {
        this.lstMaterias = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion de las materias");
      }
    })
  }

  getAllProfesores() {
    this.profesorService.getListaProfesores().subscribe({
      next: (temp) => {
        this.lstProfesores = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion de los profesores");
      }
    })
  }


  guardarSeleccionCarrera() {

    console.log("**Carrera seleccionada: " + this.form.get('carreraSeleccionada')?.value);
    this.form.controls['lblCarreraSeleccionada'].setValue(this.form.get('carreraSeleccionada')?.value);

  }

  guardarSeleccionMateria() {

    console.log("**Materia seleccionada: " + this.form.get('materiaSeleccionada')?.value);
    this.form.controls['lblMateriaSeleccionada'].setValue(this.form.get('materiaSeleccionada')?.value);

  }

  guardarSeleccionProfesor() {

    console.log("**profesor seleccionada: " + this.form.get('profesorSeleccionado')?.value);
    this.form.controls['lblProfesorSeleccionado'].setValue(this.form.get('profesorSeleccionado')?.value);

  }



  getActualSelectedCarrera() {

    return this.form.get('lblCarreraSeleccionada')?.value;
  }

  showSelectedCarrera() {
    if (this.form.get('lblCarreraSeleccionada')?.value >= 1) {
      return true;
    }
    return false;
  }

  getActualSelectedMateria() {

    return this.form.get('lblMateriaSeleccionada')?.value;
  }

  showSelectedMateria() {
    if (this.form.get('lblMateriaSeleccionada')?.value >= 1) {
      return true;
    }
    return false;
  }

  getActualSelectedProfesor() {

    return this.form.get('lblProfesorSeleccionado')?.value;
  }

  showSelectedProfesor() {
    if (this.form.get('lblProfesorSeleccionado')?.value >= 1) {
      return true;
    }
    return false;
  }

}