import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../../services/carreras.service';
import { Routes, RouterModule, Router } from '@angular/router'; // CLI imports router
import { Carrera } from '../../models/carreras.interface';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/utils/Utilities';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})


export class CarrerasComponent implements OnInit {

  lstCarreras: Carrera[];

  constructor(private carreraService: CarrerasService, private router: Router,) {
    this.lstCarreras = [];
  }

  //#region "Functions based on Views"

  ngOnInit(): void {
    this.getAllCarreras();
  }

  navigateToForm() {
    this.router.navigate(['/agregarCarrera']);
  }


  //#endregion

  //#region "Functions DB Calls"
  getAllCarreras() {
    this.carreraService.getListaCarreras().subscribe({
      next: (temp) => {
        this.lstCarreras = temp;
      },
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

  deleteCarrera(event: any) {
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
        this.carreraService.deleteCarrera(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            this.getAllCarreras();
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

  updateCarrera(valor: number) {
    if (valor) {
      this.router.navigate(['/agregarCarrera', valor]);
    }
  }

  //#endregion

}
