import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts'; 
import { LegendPosition } from '@swimlane/ngx-charts';

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
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public legendPosition: LegendPosition = LegendPosition.Below;

  // Dados para o histórico de vendas
  sales = [
    { date: new Date('2024-07-01T15:30:00'), userName: 'João da Silva', quantity: 20 },
    { date: new Date('2024-07-02T10:45:00'), userName: 'Maria Oliveira', quantity: 15 },
    { date: new Date('2024-07-03T09:20:00'), userName: 'Carlos Souza', quantity: 30 }
  ];

  // Dados para o gráfico de vendas por categoria
  categoryData = [
    { name: 'Eletrônicos', value: 350 },
    { name: 'Moda', value: 200 },
    { name: 'Livros', value: 150 }
  ];

  // Dados para os top 10 produtos mais vendidos
  topProducts = [
    { rank: 1, name: 'Celular', quantity: 120 },
    { rank: 2, name: 'Notebook', quantity: 90 },
    { rank: 3, name: 'Livro A', quantity: 80 },
    { rank: 4, name: 'Tablet', quantity: 70 },
    { rank: 5, name: 'Camiseta', quantity: 65 },
    { rank: 6, name: 'Tênis', quantity: 60 },
    { rank: 7, name: 'Smart TV', quantity: 55 },
    { rank: 8, name: 'Câmera', quantity: 50 },
    { rank: 9, name: 'Fone de Ouvido', quantity: 45 },
    { rank: 10, name: 'Relógio', quantity: 40 }
  ];

  // Colunas a serem exibidas na tabela de top produtos
  displayedColumns: string[] = ['rank', 'productName', 'quantitySold'];

  // Ajuste para a iteração correta do *ngFor
  getRank(index: number): number {
    return index + 1;
  }
}