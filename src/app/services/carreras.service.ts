import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/utils/Endpoints";
import { Carrera } from "../models/carreras.interface";

@Injectable({
    providedIn: 'root'
})

export class CarrerasService {
    constructor(private httpClient: HttpClient) { }

    //Obtener lista de carreras
    getListaCarreras() {
        return this.httpClient.get<any>(Endpoints.getCarreras);
    }

    // Obtener carrera por ID
    getCarreraPorID(idCarrera: number) {
        return this.httpClient.get<Carrera>(Endpoints.getCarreraPorID.replace(':id',
        idCarrera.toString()));
    }

    // Actualizar carrera
    updateCarrera(idCarrera: number, carrera: Carrera) {
        // Se arma el objeto a enviar
        let body = {
            "id": carrera.id,
            "codigoCarrera": carrera.codigoCarrera,
            "nombreCarrera": carrera.nombreCarrera
        }
        return this.httpClient.patch<number>(Endpoints.updateCarrera.replace(':id', idCarrera
            .toString()), body);
    }

    // Insertar carrera
    postCarrera(carrera: Carrera) {
        // Se arma el objeto a enviar
        let body = {
            "id": carrera.id,
            "codigoCarrera": carrera.codigoCarrera,
            "nombreCarrera": carrera.nombreCarrera
        }
        return this.httpClient.post<any>(Endpoints.postCarrera, body);
    }

    // Eliminar una carrera
    deleteCarrera(idCarrera: number) {
        return this.httpClient.delete<any>(Endpoints.deleteCarrera.replace(':id',
        idCarrera.toString()));
    }

}