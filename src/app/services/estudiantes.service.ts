import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/utils/Endpoints";
import { Estudiante } from "../models/estudiantes.interface";

@Injectable({
    providedIn: 'root'
})

export class EstudiantesService {
    constructor(private httpClient: HttpClient) { }

    //Obtener lista de estudiantes
    getListaEstudiantes() {
        return this.httpClient.get<any>(Endpoints.getEstudiantes);
    }

    // Obtener estudiante por ID
    getEstudiantePorID(idEstudiante: number) {
        return this.httpClient.get<Estudiante>(Endpoints.getEstudiantePorID.replace(':id',
            idEstudiante.toString()));
    }

    // Actualizar estudiante
    updateEstudiante(idEstudiante: number, estudiante: Estudiante) {
        // Se arma el objeto a enviar
        let body = {
            "id": estudiante.id,
            "codigo": estudiante.codigo,
            "nombres": estudiante.nombres,
            "apellidos": estudiante.apellidos,
            "email": estudiante.email
        }
        return this.httpClient.patch<number>(Endpoints.updateEstudiante.replace(':id', idEstudiante
            .toString()), body);
    }

    // Insertar estudiante
    postEstudiante(estudiante: Estudiante) {
        // Se arma el objeto a enviar
        let body = {
            "codigo": estudiante.codigo,
            "nombres": estudiante.nombres,
            "apellidos": estudiante.apellidos,
            "email": estudiante.email
        }
        return this.httpClient.post<any>(Endpoints.postEstudiante, body);
    }

    // Eliminar un estudiante
    deleteEstudiante(idEstudiante: number) {
        return this.httpClient.delete<any>(Endpoints.deleteEstudiante.replace(':id',
            idEstudiante.toString()));
    }

}