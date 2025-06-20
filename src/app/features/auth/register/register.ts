import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private router: Router, private authService: Auth) {}

  passwordMismatch = false;
  private passwordPattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!.,;:_+%*?&^'\\s-].*)[A-Za-z\\d@$!%*.,;:_+?&^'\\s-]{8,16}$"
  );


  onSubmit(form: NgForm) {
    if (form.valid) {
      const { fullName, email, password, passwordConfirmation } = form.value;
      this.passwordMismatch = password !== passwordConfirmation;

      if (form.valid && !this.passwordMismatch) {
        if (!this.passwordPattern.test(password)) {
          alert(
            'La contraseña debe tener entre 8 y 16 caracteres, incluir mayúsculas, minúsculas, números y un caracter especial.'
          );
          return;
        }

        this.authService.createUser({ fullName, email, password, passwordConfirmation }).subscribe({
          next: (response) => {
            if (response)
            {
              this.router.navigate(['/auth/login']);
            }
          },
          error: (err) => {
            alert(err.error[0].Message);
          }
        });
    }
    } else {
      alert('Por favor corrige los errores del formulario.');
    }      
  }
}

