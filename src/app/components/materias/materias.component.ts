import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router'; // CLI imports router
import { parsearErroresAPI } from 'src/app/utils/Utilities';
import Swal from 'sweetalert2';
import { Materia } from '../../models/materias.interface';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements OnInit {

  lstMaterias: Materia[];

  constructor(private materiaService: MateriasService, private router: Router,) {
    this.lstMaterias = [];
  }

  //#region "Functions based on Views"

  ngOnInit(): void {
    this.getAllMaterias();
  }

  navigateToForm() {
    this.router.navigate(['/agregarMateria']);
  }


  //#endregion

  //#region "Functions DB Calls"
  getAllMaterias() {
    this.materiaService.getListaMaterias().subscribe({
      next: (temp) => {

        this.lstMaterias = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

  deleteMateria(event: any) {
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
        this.materiaService.deleteMateria(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            this.getAllMaterias();
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

  updateMateria(valor: number) {
    if (valor) {
      this.router.navigate(['/agregarMateria', valor]);
    }
  }

  //#endregion

}