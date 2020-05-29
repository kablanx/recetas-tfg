import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { DefaultComponent } from './components/default/default.component';
import { RecetaNewComponent } from './components/receta-new/receta-new.component';
import { RecetaEditComponent } from './components/receta-edit/receta-edit.component';
import { UsuarioEditarComponent } from './components/usuario-editar/usuario-editar.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';
import { RecetaMostrarComponent } from './components/receta-mostrar/receta-mostrar.component';
import { MensajesBandejaComponent } from './components/mensajes-bandeja/mensajes-bandeja.component';
import { VerMensajesComponent } from './components/ver-mensajes/ver-mensajes.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DefaultComponent,
    RecetaNewComponent,
    RecetaEditComponent,
    UsuarioEditarComponent,
    UsuarioPerfilComponent,
    ExplorarComponent,
    VerPerfilComponent,
    RecetaMostrarComponent,
    MensajesBandejaComponent,
    VerMensajesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
