from datetime import datetime
from typing import List, Dict

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

from products.models.products_model import ProductsM, ProductSoldM
from shared.dependencies import get_db
from shared.exceptions import NotFound
from auth.routers.auth_utils import obter_usuario_logado

router = APIRouter(prefix="/buy")


class UserResponse(BaseModel):
    id: int
    username: str
    role: str


class ProductsResponse(BaseModel):
    productId: int
    productName: str
    productImageUrl: str
    productPrice: float
    productDesc: str
    productCategory: str
    productAmount: int
    productAmountSuggestion: int
    vendorName: str


class ProductRequest(BaseModel):
    productName: str
    productImageUrl: str
    productPrice: float
    productDesc: str
    productCategory: str
    productAmount: int
    productAmountSuggestion: int


class BuyRequest(BaseModel):
    productId: int
    productName: str
    productCategory: str
    soldAmount: int


class BuyResponse(BaseModel):
    id: int
    clientName: str
    vendorName: str
    productId: int
    productName: str
    productCategory: str
    soldAmount: int
    soldTime: str


class ProductSoldResponse(BaseModel):
    id: int
    clientName: str
    vendorName: str
    productId: int
    productName: str
    productCategory: str
    soldAmount: int
    soldTime: str

    class Config:
        from_attributes = True


@router.post("", response_model=BuyResponse, status_code=201)
def buy_product(
    bought_request_data: BuyRequest,
    db: Session = Depends(get_db),
    usuario_logado: UserResponse = Depends(obter_usuario_logado)) -> BuyResponse:
    # Obter a data e hora atuais
    sold_time_date = datetime.utcnow()
    sold_time_str = sold_time_date.strftime('%Y-%m-%d %H:%M:%S')

    # Buscar o produto pelo ID
    product = busca_produto_por_id(bought_request_data.productId, db)

    if product.productAmount < bought_request_data.soldAmount:
        raise HTTPException(status_code=400, detail="Quantidade insuficiente disponível para compra")

    product.productAmount -= bought_request_data.soldAmount
    db.commit()
    db.refresh(product)
    bought_product_data = ProductSoldM(
        clientName=usuario_logado.username,
        vendorName=product.vendorName,
        productId=bought_request_data.productId,
        productName=bought_request_data.productName,
        productCategory=bought_request_data.productCategory,
        soldAmount=bought_request_data.soldAmount,
        soldTime=sold_time_str
    )
    db.add(bought_product_data)
    db.commit()
    db.refresh(bought_product_data)
    return BuyResponse(**bought_product_data.__dict__)


@router.get("/sold", response_model=List[ProductSoldResponse])
def list_sold_products(db: Session = Depends(get_db)) -> List[ProductSoldResponse]:
    products_sold = db.query(ProductSoldM).all()

    # Lista para armazenar vendas individuais
    individual_sales = []

    # Iterar sobre cada venda
    for sale in products_sold:
        # Converter soldAmount para inteiro
        sold_amount = int(sale.soldAmount)

        # Adicionar cada venda de acordo com a quantidade vendida (soldAmount)
        for _ in range(sold_amount):
            # Criar um novo objeto ProductSoldM com soldAmount = 1
            individual_sale = ProductSoldM(
                id=sale.id,
                clientName=sale.clientName,
                vendorName=sale.vendorName,
                productId=sale.productId,
                productName=sale.productName,
                productCategory=sale.productCategory,
                soldAmount=1,  # Definir soldAmount como 1
                soldTime=sale.soldTime
            )
            individual_sales.append(individual_sale)

    # Verificar se a lista individual_sales não está vazia
    if not individual_sales:
        raise HTTPException(status_code=404, detail="Nenhuma venda encontrada")

    return individual_sales


@router.get("/top-products", response_model=Dict[str, int])
def get_top_sold_products(db: Session = Depends(get_db)) -> Dict[str, int]:
    # Consulta para contar vendas de cada produto e ordenar por quantidade decrescente
    top_products = (
        db.query(ProductSoldM.productName, func.sum(ProductSoldM.soldAmount))
        .group_by(ProductSoldM.productName)
        .order_by(func.sum(ProductSoldM.soldAmount).desc())
        .all()
    )

    # Converter resultado da consulta em um dicionário
    top_products_dict = {product_name: total_sold for product_name, total_sold in top_products}

    return top_products_dict


@router.get("/top-categories", response_model=Dict[str, int])
def get_top_sold_categories(db: Session = Depends(get_db)) -> Dict[str, int]:
    # Consulta para contar vendas por categoria e ordenar por quantidade decrescente
    top_categories = (
        db.query(ProductSoldM.productCategory, func.sum(ProductSoldM.soldAmount))
        .group_by(ProductSoldM.productCategory)
        .order_by(func.sum(ProductSoldM.soldAmount).desc())
        .all()
    )

    # Converter resultado da consulta em um dicionário
    top_categories_dict = {category: total_sold for category, total_sold in top_categories}

    return top_categories_dict


def busca_produto_por_id(product_id: int, db: Session) -> ProductsM:
    produto_por_id = db.query(ProductsM).get(product_id)

    if produto_por_id is None:
        raise NotFound("Produto")

    return produto_por_id
