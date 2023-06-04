import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AgregarEstudianteComponent } from './components/estudiantes/agregar-estudiante/agregar-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { AgregarCarrerasComponent } from './components/carreras/agregar-carreras/agregar-carreras.component';
import { MateriasComponent } from './components/materias/materias.component';
import { AgregarMateriasComponent } from './components/materias/agregar-materias/agregar-materias.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AgregarProfesoresComponent } from './components/profesores/agregar-profesores/agregar-profesores.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { AgregarGruposComponent } from './components/grupos/agregar-grupos/agregar-grupos.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    EstudiantesComponent,
    AgregarEstudianteComponent,
    CarrerasComponent,
    AgregarCarrerasComponent,
    MateriasComponent,
    AgregarMateriasComponent,
    ProfesoresComponent,
    AgregarProfesoresComponent,
    GruposComponent,
    AgregarGruposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
