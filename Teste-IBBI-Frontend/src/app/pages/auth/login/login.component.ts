import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  

  constructor(private authService: AuthService, private router:Router) {}

  logoSrc =
  'https://media.licdn.com/dms/image/D4D0BAQFFsyNw2yqKUA/company-logo_200_200/0/1716384194995/iatecam_instituto_ambiental_e_tecnologico_da_amazonia_logo?e=1728518400&v=beta&t=MLrilgQyh3LEJ-bg84bIddMkFo03_QxxWwo0VEQW5J0';
  onLogin(){
    this.authService.logIn(this.username,this.password).subscribe({
      next: (response) => {       
        this.router.navigate(['/home'])
        this.authService.setUser(response)

      },
      error: (error) => {
        alert(error.error.detail)
      },
      complete: () => {
         alert("Login Bem Sucedido")
         

      }
    }
    )
  }
}
