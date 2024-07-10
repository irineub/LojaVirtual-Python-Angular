import { Component } from '@angular/core';
import { CategoriesModel, ProductModel } from '../../../shared/models/products.model';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {
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

  constructor(private categoriesService:CategoriesService, private productsService:ProductsService, private router: Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.obterCategorias()
    this.obterProduto()
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

  obterProduto(){
    const id = this.route.snapshot.paramMap.get('id')
    this.productsService.obterProdutoPorId(id).subscribe(produto=>{
      this.produto = produto
      
    })
  }

  atualizar(){
    this.productsService.editarProduto(this.produto).subscribe(()=>{
      alert("produto atualizado com sucesso")
      this.voltar()
    })
  } 

}
