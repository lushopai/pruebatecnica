import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

  // Inyectamos los servicios necesarios: AuthService para verificar si el usuario está autenticado
  // y Router para redirigir en caso de acceso no autorizado.
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Implementación de la interfaz CanActivate.
   * Decide si se permite o no la activación de una ruta.
   */
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot 
  ):
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree { 
    
    // Llamamos a AuthService para comprobar si el usuario está autenticado.
    const isLoggedIn = this.authService.isLoggedIn();
    console.log(isLoggedIn); // Debug: muestra en la consola si el usuario está autenticado.
    console.log(route.routeConfig?.path); // Debug: muestra la ruta que se intenta activar.

    if (isLoggedIn) {
      // Si el usuario está autenticado:
      if (route.url[0]?.path.includes("login")) {
        // Si la ruta incluye "login" y el usuario ya está autenticado, redirigimos al "dashboard".
        return this.router.createUrlTree(["dashboard"]);
      } else {
        // Permite activar la ruta si no es la de "login".
        return true;
      }
    } else {
      // Si el usuario NO está autenticado:
      if (!route.url[0]?.path.includes("login")) {
        // Si no está autenticado e intenta acceder a algo diferente de "login", lo redirigimos a "login".
        return this.router.createUrlTree(["login"]);
      } else {
        // Permite activar la ruta si es "login".
        return true;
      }
    }
  }
}
