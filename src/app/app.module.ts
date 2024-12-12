import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 

import { AppComponent } from './app.component'; 
import { ProtectedPageComponent } from './modules/protected-page/components/protected-page.component'; 
import { HeaderComponent } from './shared/components/header/header.component'; 
import { SharedModule } from './shared/shared.module'; 
import { LoginComponent } from './modules/login/components/login.component'; 

import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './core/guards/auth.guard'; 

import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { TokenInterceptor } from './core/interceptors/token.interceptor'; 

// Configuración de rutas de la aplicación
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta raíz redirige a 'login'
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, // Ruta para el login, protegida por el AuthGuard
  { path: 'dashboard', component: ProtectedPageComponent, canActivate: [AuthGuard] } // Ruta del dashboard, también protegida
];

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    ProtectedPageComponent, 
    HeaderComponent 
  ],
  imports: [
    RouterModule.forRoot(routes), // Configuración de ruteo con las rutas definidas
    BrowserModule, 
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // Registramos un interceptor HTTP
      useClass: TokenInterceptor, // Clase del interceptor
      multi: true // Permite múltiples interceptores simultáneamente
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
