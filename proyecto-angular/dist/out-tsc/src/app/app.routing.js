import { RouterModule } from '@angular/router';
// Components
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { RecetaNewComponent } from './components/receta-new/receta-new.component';
import { RecetaEditComponent } from './components/receta-edit/receta-edit.component';
import { UsuarioEditarComponent } from './components/usuario-editar/usuario-editar.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';
import { RecetaMostrarComponent } from './components/receta-mostrar/receta-mostrar.component';
const appRoutes = [
    { path: '', component: DefaultComponent },
    { path: 'inicio', component: DefaultComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'crear-receta', component: RecetaNewComponent },
    { path: 'editar-receta/:id', component: RecetaEditComponent },
    { path: 'mostrar-receta/:id', component: RecetaMostrarComponent },
    { path: 'editar-usuario/:id', component: UsuarioEditarComponent },
    { path: 'perfil-usuario/:id', component: UsuarioPerfilComponent },
    { path: 'ver-perfil/:id', component: VerPerfilComponent },
    { path: 'explorar', component: ExplorarComponent },
    /* { path: 'ver-receta/:id', component: VerRecetaComponent}, */
    // Ruta no existe
    { path: '**', component: DefaultComponent },
];
export const appRoutingProviders = [];
export const routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map