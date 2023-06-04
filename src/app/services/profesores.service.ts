import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/utils/Endpoints";
import { Profesor  } from "../models/profesores.interface";

@Injectable({
    providedIn: 'root'
})

export class ProfesoresService {
    constructor(private httpClient: HttpClient) { }

    getListaProfesores() {
        return this.httpClient.get<any>(Endpoints.getProfesores);
    }

    getProfesorPorID(idProfesor: number) {
        return this.httpClient.get<Profesor>(Endpoints.getProfesorPorID.replace(':id',
        idProfesor.toString()));
    }

    updateProfesor(idProfesor: number, Profesor: Profesor) {
        let body = {
            "id": Profesor.id,
            "nombres": Profesor.nombres,
            "apellidos" : Profesor.apellidos,
            "email" : Profesor.email
        }
        return this.httpClient.patch<number>(Endpoints.updateProfesor.replace(':id', idProfesor
            .toString()), body);
    }

    postProfesor(Profesor: Profesor) {
        let body = {
            "id": Profesor.id,
            "nombres": Profesor.nombres,
            "apellidos" : Profesor.apellidos,
            "email" : Profesor.email
        }
        return this.httpClient.post<any>(Endpoints.postProfesor, body);
    }

    deleteProfesor(idCarrera: number) {
        return this.httpClient.delete<any>(Endpoints.deleteProfesor.replace(':id',
        idCarrera.toString()));
    }

}