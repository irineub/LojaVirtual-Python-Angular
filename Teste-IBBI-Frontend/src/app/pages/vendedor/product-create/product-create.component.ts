import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesModel, ProductModel } from '../../../shared/models/products.model';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
  categoriasLista:CategoriesModel[] = []
  produto:ProductModel={
    productName:"",
    productDesc:"",
    productPrice:0,
    productCategory:"",
    productImageUrl:"",
    productAmount:NaN,
    productAmountSuggestion:NaN,
  
  }

  defaultImageUrl: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmka1151lcgF4UjzJdPgsDQOXhPyVI6sx7XA&s';
  productImageUrl: string = '';

  constructor(private categoriesService:CategoriesService, private productsService:ProductsService, private router: Router){}

  ngOnInit(): void {
    this.obterCategorias()
  }

  voltar(){
    this.router.navigate(["/vendedor"])
  }

  obterCategorias() {
    this.categoriesService.obterCategorias()
      .subscribe(categorias => {
        this.categoriasLista = categorias;
      });
  }

  updatePreview() {
    if (this.produto.productImageUrl.trim() === '') {
      this.productImageUrl = this.defaultImageUrl;
    }
  }

  criarProduto(){
    this.productsService.criarProduto(this.produto).subscribe({
      next: (response) => {       
      },
      error: (error) => {
        alert(error.error.detail)
      },
      complete: () => {
         alert("Produto Criado")
         this.router.navigate(['/vendedor'])

      }
    }
    )
  }

}
