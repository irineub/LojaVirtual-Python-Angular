import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule, colorSets } from '@swimlane/ngx-charts'; 
import { BuyProductService } from '../../../shared/services/buyProduct.service';
import { BuyModel } from '../../../shared/models/products.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  history: BuyModel[] = [];
  view: [number, number] = [400, 300]; 
  
  categoriasData: any[] = [];
  categoriasMais: { [key: string]: number } = {};
  produtosMais: { [key: string]: number } = {};
  produtosData: any[] = [];


  constructor(private buyService: BuyProductService) {}

  ngOnInit(): void {
    this.obterDados();
  }

  obterDados() {
    this.obterCategoriasMais();
    this.obterProdutosMais(); 
    this.obterHistorico();
  }

  obterHistorico() {
    this.buyService.obterComprados().subscribe((response) => {
      this.history = response;
    });
  }

  obterCategoriasMais() {
    this.buyService.obterCategoriasMaisVendidas().subscribe((response) => {
      this.categoriasMais = response as { [key: string]: number };
      this.transformDataCat();
    });
  }
  obterProdutosMais() {
    this.buyService.obterProdutosMaisVendidos().subscribe((response) => {
      this.produtosMais = response as { [key: string]: number };
      this.transformDataProd();
    });
  }


  formatSoldTime(soldTime: string | undefined, format: 'date' | 'time'): string {
    if (!soldTime) {
      return ''; // ou algum valor padrão
    }
    const date = new Date(soldTime);
    if (format === 'date') {
      return date.toLocaleDateString('pt-BR');
    } else {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  }

  transformDataCat(): void {
    this.categoriasData = Object.keys(this.categoriasMais).map(key => ({
      name: key,
      value: this.categoriasMais[key]
    }));
  }
  transformDataProd(): void {
    this.produtosData = Object.keys(this.produtosMais).map(key => ({
      name: key,
      value: this.produtosMais[key]
    }));
  }
}
