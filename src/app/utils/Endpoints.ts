import { environment } from "src/enviroments/enviroment";

export const Endpoints = {
    //ESTUDIANTES
    getEstudiantes: environment.apiURL.concat('/Estudiante/obtenerListaEstudiantes'),
    updateEstudiante: environment.apiURL.concat('/Estudiante/actualizarEstudiante?id=:id'),
    getEstudiantePorID: environment.apiURL.concat('/Estudiante/obtenerEstudiante?id=:id'),
    postEstudiante: environment.apiURL.concat('/Estudiante/insertarEstudiante'),
    deleteEstudiante: environment.apiURL.concat('/Estudiante/eliminarEstudiante?id=:id'),

    //CARRERAS
    getCarreras: environment.apiURL.concat('/Carrera/obtenerListaCarreras'),
    updateCarrera: environment.apiURL.concat('/Carrera/actualizarCarrera?id=:id'),
    getCarreraPorID: environment.apiURL.concat('/Carrera/obtenerCarrera?id=:id'),
    postCarrera: environment.apiURL.concat('/Carrera/insertarCarrera'),
    deleteCarrera: environment.apiURL.concat('/Carrera/eliminarCarrera?id=:id'),

    //Materias
    getMaterias: environment.apiURL.concat('/Materia/obtenerListaMaterias'),
    updateMateria: environment.apiURL.concat('/Materia/actualizarMateria?id=:id'),
    getMateriaPorID: environment.apiURL.concat('/Materia/obtenerMateria?id=:id'),
    postMateria: environment.apiURL.concat('/Materia/insertarMateria'),
    deleteMateria: environment.apiURL.concat('/Materia/eliminarMateria?id=:id'),

    //Profesores
    getProfesores: environment.apiURL.concat('/Profesor/obtenerListaProfesores'),
    updateProfesor: environment.apiURL.concat('/Profesor/actualizarProfesor?id=:id'),
    getProfesorPorID: environment.apiURL.concat('/Profesor/obtenerProfesor?id=:id'),
    postProfesor: environment.apiURL.concat('/Profesor/insertarProfesor'),
    deleteProfesor: environment.apiURL.concat('/Profesor/eliminarProfesor?id=:id'),

    //Grupos
    getGrupos: environment.apiURL.concat('/Grupo/obtenerListaGrupos'),
    updateGrupo: environment.apiURL.concat('/Grupo/actualizarGrupo?id=:id'),
    getGrupoPorID: environment.apiURL.concat('/Grupo/obtenerGrupo?id=:id'),
    postGrupo: environment.apiURL.concat('/Grupo/insertarGrupo'),
    deleteGrupo: environment.apiURL.concat('/Grupo/eliminarGrupo?id=:id'),


}