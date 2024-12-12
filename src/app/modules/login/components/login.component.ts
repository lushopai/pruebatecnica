import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user'; 
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup; // Formulario reactivo para gestionar los datos de inicio de sesión
  usuario: User = new User(); 

  constructor(
    private formBuilder: FormBuilder, // Servicio para construir formularios reactivos
    private auth: AuthService, // Servicio de autenticación
    private router: Router // Servicio para la navegación entre rutas
  ) {
    // Inicialización del formulario con validadores para los campos
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Campo obligatorio para el nombre de usuario
      password: ['', Validators.required] // Campo obligatorio para la contraseña
    });
  }

  /**
   * Método llamado al enviar el formulario.
   * Envía los datos al servicio de autenticación y maneja la respuesta.
   */
  signIn() {
    // Llama al método `login` del servicio de autenticación, pasando el usuario
    this.auth.login(this.usuario).subscribe({
      next: (response) => {
        // Si la autenticación es exitosa:
        // Guarda el token recibido en el servicio de autenticación
        this.auth.saveToken(response.accessToken);

        // Redirige al usuario al dashboard
        this.router.navigate(['/dashboard']);

        // Imprime en consola los datos del token decodificado y la respuesta completa
        console.log(this.auth.obtenerDatosToken(response.accessToken));
        console.log(response);
      },
      error: (err) => {
        // Si ocurre un error:
        console.log(err); // Muestra el error en consola

        if (err.status === 400) {
          // Si el error es de tipo "400" (datos inválidos), resetea el formulario
          this.loginForm.reset();
        } else {
          // Para otros errores, también resetea el formulario
          this.loginForm.reset();
        }
      },
    });
  }
}
