import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../../shared/services/admin.service';
import { Cargo, UserModel } from '../../../../shared/models/auth.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
  cargosLista:Cargo[] = [];
  user:UserModel={
    username:"",
    role:"",

  }

  ngOnInit(): void {
    this.obterCargos()


    
  }
  constructor(private adminService: AdminService, private route:ActivatedRoute, private router:Router) {}
  voltar(){
    this.router.navigate(["/admin/users"])
  }

  obterCargos() {
    this.adminService.obterCargos().subscribe((cargos) => {
      this.cargosLista = cargos;
      this.obterUsuario()
    })
  }
  obterUsuario(){
    const id = this.route.snapshot.paramMap.get('id')
    this.adminService.obterUsuarioPorId(id).subscribe(user=>{
      this.user = user
      
    })
  }

  atualizar(){
    this.adminService.editarUsuario(this.user).subscribe(()=>{
      alert("usuario atualizado com sucesso")
      this.voltar()
    })
  } 

}
