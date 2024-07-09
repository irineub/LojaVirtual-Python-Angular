import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, RouterModule],
})
export class HeaderComponent implements OnInit {
   userData = {
    username:"",
    role:""
  }
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.userData=this.authService.getUser()
  }
  onLogout(){
    this.authService.logOut()
  }
  logoSrc =
    'https://media.licdn.com/dms/image/D4D0BAQFFsyNw2yqKUA/company-logo_200_200/0/1716384194995/iatecam_instituto_ambiental_e_tecnologico_da_amazonia_logo?e=1728518400&v=beta&t=MLrilgQyh3LEJ-bg84bIddMkFo03_QxxWwo0VEQW5J0';
}
