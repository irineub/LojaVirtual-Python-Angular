import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductModel } from '../../../shared/models/products.model';
import { ProductsService } from '../../../shared/services/products.service';
import { AuthService } from '../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendedor-page',
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
    CommonModule,
    FormsModule
  ],
  templateUrl: './vendedor-page.component.html',
  styleUrl: './vendedor-page.component.scss',
})
export class VendedorPageComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  private todosOsProdutos:ProductModel[] = [];

  meusProdutos: ProductModel[] = [];
  userData = {
    username:"",
    role:""
  }
  
  ngOnInit(): void {
    this.obterProdutosDisponiveis();
    this.userData = this.authService.getUser()
  }

  obterProdutosDisponiveis() {
    this.productsService.obterProdutos().subscribe((produtos) => {
      this.todosOsProdutos = produtos;
      this.filtrarMeusProdutos();
    });
  }

  apagarProduto(id:number){
    this.productsService.apagarProduto(id).subscribe({
      next: (response) => {       
        this.obterProdutosDisponiveis()
      },
      error: (error) => {
        alert(error.errors.detail)
      },
      complete: () => {
         alert("Produto Apagado")

      }
    }

    )
  }
  filtrarMeusProdutos() {
    this.meusProdutos = this.todosOsProdutos.filter(produto => {
      return produto.vendorName === this.userData.username;
    });
    this.dataSource.data = this.meusProdutos;

  }

  displayedColumns: string[] = [
    'productId',
    'productName',
    'productPrice',
    'productCategory',
    'productAmount',
    'productAmountSuggestion',
    'actions'
  ];

  dataSource = new MatTableDataSource(this.meusProdutos);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
