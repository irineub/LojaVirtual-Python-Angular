import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from '../../../shared/models/products.model';
import { CategoriesService } from '../../../shared/services/categories.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss',
})
export class CategoryCreateComponent implements OnInit{
  categoriasLista: CategoriesModel[] = [];
  categoria:CategoriesModel ={
    categoryId:0,
    categoryName:"",
    categoryDesc:""
  }
  
  displayedColumns: string[] = [
    'catecoryId',
    'categoryName',
    'CategoryDesc',
    'actions',
  ];


  dataSource = new MatTableDataSource(this.categoriasLista);

  constructor(private categoriesService: CategoriesService, private router:Router) {}

  ngOnInit(): void {
    this.obterCategorias()
  }
  voltar(){
    this.router.navigate(["/vendedor/criarProduto"])
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  obterCategorias() {
    this.categoriesService.obterCategorias().subscribe((categorias) => {
      this.categoriasLista = categorias
      this.dataSource.data = this.categoriasLista;

    });
  }

  criarCategoria(){
    this.categoriesService.criarCategoria(this.categoria).subscribe({
      next: (response) => {       
        this.obterCategorias()
      },
      error: (error) => {
        alert(error.error.detail)
      },
      complete: () => {
         alert("Categoria Criada")
         

      }
    }
    )
  }
  apagarCategoria(id:any){
    this.categoriesService.apagarCategoria(id).subscribe({
      next: (response) => {       
        this.obterCategorias()
      },
      error: (error) => {
        alert(error.error.detail)
      },
      complete: () => {
         alert("Categoria Apagada")
         

      }
    }

    )
  }

  submitForm() {
    console.log('Formulário enviado!');
  }
}
