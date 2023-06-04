import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/utils/Endpoints";
import { Grupo  } from "../models/grupos.interface";

@Injectable({
    providedIn: 'root'
})

export class GruposService {
    constructor(private httpClient: HttpClient) { }

    getListaGrupos() {
        return this.httpClient.get<any>(Endpoints.getGrupos);
    }

    getGrupoPorID(idGrupo: number) {
        return this.httpClient.get<Grupo>(Endpoints.getGrupoPorID.replace(':id',
        idGrupo.toString()));
    }

    updateGrupo(idGrupo: number, Grupo: Grupo) {
        
        return this.httpClient.patch<number>(Endpoints.updateGrupo.replace(':id', idGrupo
            .toString()), this.baseModelBuilder(Grupo));
    }

    postGrupo(Grupo: Grupo) {
        return this.httpClient.post<any>(Endpoints.postGrupo, this.baseModelBuilder(Grupo));
    }

    deleteGrupo(idCarrera: number) {
        return this.httpClient.delete<any>(Endpoints.deleteGrupo.replace(':id',
        idCarrera.toString()));
    }

    baseModelBuilder(Grupo: Grupo){

        let body = {
            "id": Grupo.id,
            "idCarrera": Grupo.idCarrera,
            "idMateria": Grupo.idMateria,
            "idProfesor": Grupo.idProfesor,
            "ciclo": Grupo.ciclo,
            "anio": Grupo.anio,
        }

        return body;
    }

}