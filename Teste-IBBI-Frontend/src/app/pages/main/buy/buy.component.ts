import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CambioDolarService } from '../../../shared/services/cambio.service';
import { BuyProductService } from '../../../shared/services/buyProduct.service';
import { ProductsService } from '../../../shared/services/products.service';
import { BuyModel, ProductModel } from '../../../shared/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [MatCardModule, CommonModule, FormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit {
  cotacaoDolar: number = 0;
  produtoAtual:ProductModel= {
    productId:0,
    productName:"",
    productImageUrl:"",
    productAmount:0,
    productCategory:"",
    productDesc:"",
    productPrice:0,
    productAmountSuggestion:0
  }
  produtoVendido:BuyModel={
    productId:0,
    productName:"",
    productCategory:"",
    soldAmount:1
  }

  voltar(){
    this.router.navigate(["/home"])
  }


  constructor( 
    private cambioDolarService: CambioDolarService,
    private buyService: BuyProductService,
    private productService: ProductsService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit() {
    this.getProdutoSelecionado()
    this.obterTaxaDeCambio();
  }

  getProdutoSelecionado(){
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.obterProdutoPorId(id).subscribe(produto=>{
      this.produtoAtual = produto
    })
  }
  comprarProduto(){
    this.produtoVendido.productId = this.produtoAtual.productId
    this.produtoVendido.productCategory = this.produtoAtual.productCategory
    this.produtoVendido.productName = this.produtoAtual.productName

    this.buyService.postarCompra(this.produtoVendido).subscribe((response)=>{
      alert("Produto Comprado")
      this.voltar()
    })

  }


  formatPrice(price: number): string {
    const priceInReal = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const priceInDollar = (price / this.cotacaoDolar).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
    return `${priceInReal} / ${priceInDollar}`;
  }

  obterTaxaDeCambio() {
    this.cambioDolarService.getCambioBRLtoUSD()
      .subscribe(response=>{
        this.cotacaoDolar = response[0].high

      })
  
  }
}
