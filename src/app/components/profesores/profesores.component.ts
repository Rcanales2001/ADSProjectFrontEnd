import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router'; // CLI imports router
import { parsearErroresAPI } from 'src/app/utils/Utilities';
import Swal from 'sweetalert2';
import { Profesor } from '../../models/profesores.interface';
import { ProfesoresService } from '../../services/profesores.service';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})

export class ProfesoresComponent implements OnInit {

  lstProfesors: Profesor[];

  constructor(private ProfesorService: ProfesoresService, private router: Router,) {
    this.lstProfesors = [];
  }

  //#region "Functions based on Views"

  ngOnInit(): void {
    this.getAllProfesors();
  }

  navigateToForm() {
    this.router.navigate(['/agregarProfesor']);
  }


  //#endregion

  //#region "Functions DB Calls"
  getAllProfesors() {
    this.ProfesorService.getListaProfesores().subscribe({
      next: (temp) => {

        this.lstProfesors = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

  deleteProfesor(event: any) {
    Swal.fire({
      title: "¿Quiere eliminar este registro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProfesorService.deleteProfesor(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            this.getAllProfesors();
          },
          // En caso erroneo
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: parsearErroresAPI(err).toString()
            });
          }
        });
      }
    });
  }

  updateProfesor(valor: number) {
    if (valor) {
      this.router.navigate(['/agregarProfesor', valor]);
    }
  }

  //#endregion

}
