import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = '';
    password = '';
    loading = false;
    error = '';

    constructor(private authService: AuthService) { }

    onSubmit(): void {
        if (!this.username || !this.password) {
            this.error = 'Por favor ingresa usuario y contraseña';
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login({
            username: this.username,
            password: this.password
        }).subscribe({
            next: () => {
                // Navigation handled in service
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                if (err.status === 401) {
                    this.error = 'Credenciales incorrectas (Prueba: admin / admin123)';
                } else {
                    this.error = 'Error de conexión con el servidor: ' + err.message;
                }
                console.error('Login error', err);
            }
        });
    }
}
