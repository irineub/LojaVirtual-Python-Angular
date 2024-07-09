import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../auth.service"

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  logIn = false

  canActivate(): boolean {
    this.logIn = this.authService.isLoggedIn()
    if (this.logIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
