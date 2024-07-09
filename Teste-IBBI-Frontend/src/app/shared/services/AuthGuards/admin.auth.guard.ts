import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../auth.service"

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  userData = {
    username:"",
    role:""
  }
  logIn = false

  canActivate(): boolean {
    this.userData = this.authService.getUser()
    this.logIn = this.authService.isLoggedIn()
    if (this.logIn && this.userData.role=="admin") {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
