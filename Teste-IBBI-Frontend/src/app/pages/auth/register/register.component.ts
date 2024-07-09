import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  
  constructor(private authService: AuthService,private router:Router) {}
  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/login'])
      },
      error: (error) => {
        alert(error.error.detail)
      },
      complete: () => {
        alert("Registro Bem Sucedido")
      }
    });
  }

  logoSrc =
    'https://media.licdn.com/dms/image/D4D0BAQFFsyNw2yqKUA/company-logo_200_200/0/1716384194995/iatecam_instituto_ambiental_e_tecnologico_da_amazonia_logo?e=1728518400&v=beta&t=MLrilgQyh3LEJ-bg84bIddMkFo03_QxxWwo0VEQW5J0';
}
