import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {
  isCollapsed = false;
  constructor(private authService: Auth, private router: Router) {}

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  cerrarSesion() {
    this.authService.logout();  // Limpia sesión
    this.router.navigate(['/auth/login']);  // Navega a login
  }
}
