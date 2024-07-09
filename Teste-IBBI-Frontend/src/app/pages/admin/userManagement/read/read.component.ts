import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../../shared/services/admin.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserModel } from '../../../../shared/models/auth.model';
@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
})
export class ReadComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}
  listaUsuarios: UserModel[] = [];
  dataSource = new MatTableDataSource(this.listaUsuarios);
  displayedColumns: string[] = [
    'username',
    'role',
    'actions'
  ];
  ngOnInit(): void {
    this.obterUsuarios()
  }
  obterUsuarios(){
    this.adminService.obterUsuarios().subscribe((usuarios) => {
      this.listaUsuarios = usuarios;
      this.dataSource.data = this.listaUsuarios
    });
  }
  apagarUsuario(id:number,username:string){
    if(username=="admin"){
      alert("você não pode excluir o usuario admin")
    }else{
      this.adminService.apagarUsuario(id).subscribe({
        next: (response) => {       
          this.obterUsuarios()
        },
        error: (error) => {
          alert(error.errors.detail)
        },
        complete: () => {
           alert("Usuario excluido")
  
        }
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
