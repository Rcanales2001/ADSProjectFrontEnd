import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarCarrerasComponent } from './components/carreras/agregar-carreras/agregar-carreras.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { ComponentsComponent } from './components/components.component';
import { AgregarEstudianteComponent } from './components/estudiantes/agregar-estudiante/agregar-estudiante.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AgregarGruposComponent } from './components/grupos/agregar-grupos/agregar-grupos.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { AgregarMateriasComponent } from './components/materias/agregar-materias/agregar-materias.component';
import { MateriasComponent } from './components/materias/materias.component';
import { AgregarProfesoresComponent } from './components/profesores/agregar-profesores/agregar-profesores.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';

const routes: Routes = [
  { path:'', component: ComponentsComponent, pathMatch: 'full' },
  { path:'estudiantes',component: EstudiantesComponent},
  { path:'agregarEstudiante', component: AgregarEstudianteComponent},
  { path:'agregarEstudiante/:idEstudiante', component: AgregarEstudianteComponent},

  { path:'carreras',component: CarrerasComponent},
  { path:'agregarCarrera', component: AgregarCarrerasComponent},
  { path:'agregarCarrera/:idCarrera', component: AgregarCarrerasComponent},

  { path:'materias',component: MateriasComponent},
  { path:'agregarMateria', component: AgregarMateriasComponent},
  { path:'agregarMateria/:idMateria', component: AgregarMateriasComponent},

  { path:'profesores',component: ProfesoresComponent},
  { path:'agregarProfesor', component: AgregarProfesoresComponent},
  { path:'agregarProfesor/:idProfesor', component: AgregarProfesoresComponent},

  { path:'grupos',component: GruposComponent},
  { path:'agregarGrupo', component: AgregarGruposComponent},
  { path:'agregarGrupo/:idGrupo', component: AgregarGruposComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
