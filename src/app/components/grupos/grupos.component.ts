import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router'; // CLI imports router
import { parsearErroresAPI } from 'src/app/utils/Utilities';
import Swal from 'sweetalert2';
import { Grupo } from '../../models/grupos.interface';
import { GruposService } from '../../services/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  lstGrupos: Grupo[];

  constructor(private GrupoService: GruposService, private router: Router,) {
    this.lstGrupos = [];
  }

  //#region "Functions based on Views"

  ngOnInit(): void {
    this.getAllGrupos();
  }

  navigateToForm() {
    this.router.navigate(['/agregarGrupo']);
  }


  //#endregion

  //#region "Functions DB Calls"
  getAllGrupos() {
    this.GrupoService.getListaGrupos().subscribe({
      next: (temp) => {

        this.lstGrupos = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

  deleteGrupo(event: any) {
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
        this.GrupoService.deleteGrupo(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            this.getAllGrupos();
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

  updateGrupo(valor: number) {
    if (valor) {
      this.router.navigate(['/agregarGrupo', valor]);
    }
  }

  //#endregion

}
