import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private API_URL = "https://dummyjson.com/auth/login";
  private _token: string | any;

  constructor(private http: HttpClient) {}

  login(data: User): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>(this.API_URL, data, { headers });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    this._token = null;
    sessionStorage.clear();
    sessionStorage.removeItem("token");
  }
  saveToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem("token", accessToken);
  }

  public get token(): any {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
  }

  obtenerDatosToken(token: any): any {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  
}
