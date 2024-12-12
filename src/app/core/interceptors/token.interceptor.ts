import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //rescata el token del localStorage
    let token = this.authService.token;
    if (token != null) {
      const authReq = request.clone({
        //Si existe el token, se agrega al encabezado de la petición
        headers: request.headers.set("Authorization", `Bearer ${token}`),
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
