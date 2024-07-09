import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { CambioDolarService } from './../../../shared/services/cambio.service';
import { Component, OnInit } from '@angular/core';
import {
  CategoriesModel,
  ProductModel,
} from '../../../shared/models/products.model';
import { ProductsService } from '../../../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../shared/services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatSidenavModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  produtos: ProductModel[] = [];
  categorias: CategoriesModel[] = [];
  filteredProdutos: ProductModel[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  cotacaoDolar: number = 0;
  isActive = 'isActive';
  constructor(
    private cambioDolarService: CambioDolarService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.obterProdutosDisponiveis();
    this.obterTaxaDeCambio();
    this.obterCategorias();
  }
  obterProdutosDisponiveis() {
    this.productsService.obterProdutos().subscribe((produtos) => {
      this.produtos = produtos.filter((produto) => produto.productAmount > 0);
      this.filteredProdutos = this.produtos;
      this.selectedCategory = '';
    });
  }

  obterCategorias() {
    this.categoriesService.obterCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  filterProducts() {
    this.filteredProdutos = this.produtos.filter((produto) => {
      return (
        produto.productAmount > 0 &&
        produto.productName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) &&
        (this.selectedCategory
          ? produto.productCategory === this.selectedCategory
          : true)
      );
    });
  }

  onSearchChange() {
    if (this.searchTerm == '') {
      this.obterProdutosDisponiveis();
      this.selectedCategory = '';
    }
    this.filterProducts();
  }

  searchByCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
    if (this.isActive == '') {
      this.isActive = 'isActive';
    } else {
      this.isActive = '';
    }
  }

  formatPrice(price: number): string {
    const priceInReal = price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const priceInDollar = (price / this.cotacaoDolar).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'USD',
    });
    return `${priceInReal} / ${priceInDollar}`;
  }

  obterTaxaDeCambio() {
    this.cambioDolarService.getCambioBRLtoUSD().subscribe((response) => {
      this.cotacaoDolar = response[0].high;
    });
  }
}
