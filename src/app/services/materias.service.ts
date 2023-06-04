import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/utils/Endpoints";
import { Materia } from "../models/materias.interface";

@Injectable({
    providedIn: 'root'
})

export class MateriasService {
    constructor(private httpClient: HttpClient) { }

    getListaMaterias() {
        return this.httpClient.get<any>(Endpoints.getMaterias);
    }

    getMateriaPorID(idMateria: number) {
        return this.httpClient.get<Materia>(Endpoints.getMateriaPorID.replace(':id',
        idMateria.toString()));
    }

    updateMateria(idMateria: number, materia: Materia) {
        let body = {
            "id": materia.id,
            "nombre": materia.nombre,
        }
        return this.httpClient.patch<number>(Endpoints.updateMateria.replace(':id', idMateria
            .toString()), body);
    }

    postMateria(materia: Materia) {
        let body = {
            "id": materia.id,
            "nombre": materia.nombre,
        }
        return this.httpClient.post<any>(Endpoints.postMateria, body);
    }

    deleteMateria(idCarrera: number) {
        return this.httpClient.delete<any>(Endpoints.deleteMateria.replace(':id',
        idCarrera.toString()));
    }

}