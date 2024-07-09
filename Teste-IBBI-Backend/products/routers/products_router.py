from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from products.models.products_model import ProductsM, ProductSoldM
from shared.dependencies import get_db
from shared.exceptions import NotFound
from auth.routers.auth_utils import obter_usuario_logado

router = APIRouter(prefix="/products")


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


@router.get("", response_model=List[ProductsResponse])
def list_products(db: Session = Depends(get_db)) -> List[ProductsResponse]:
    return db.query(ProductsM).all()


@router.get("/{product_id}", response_model=ProductsResponse)
def get_product_by_id(
        product_id: int,
        db: Session = Depends(get_db)) -> ProductsResponse:
    return busca_produto_por_id(product_id, db)


@router.post("", response_model=ProductsResponse, status_code=201)
def new_product(
        product_request_data: ProductRequest,
        db: Session = Depends(get_db),
        usuario_logado: UserResponse = Depends(obter_usuario_logado)) -> ProductsResponse:
    if usuario_logado.role != "admin" and usuario_logado.role != "vendedor":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores ou vendedores podem criar produtos"
        )
    new_product_data = ProductsM(
        productName=product_request_data.productName,
        productImageUrl=product_request_data.productImageUrl,
        productPrice=product_request_data.productPrice,
        productDesc=product_request_data.productDesc,
        productCategory=product_request_data.productCategory,
        productAmount=product_request_data.productAmount,
        productAmountSuggestion=product_request_data.productAmountSuggestion,
        vendorName=usuario_logado.username,
    )
    db.add(new_product_data)
    db.commit()
    db.refresh(new_product_data)
    return ProductsResponse(**new_product_data.__dict__)


@router.put("/{product_id}", response_model=ProductsResponse, status_code=200)
def edit_product(product_id: int,
                 product_request_data: ProductRequest, db: Session = Depends(get_db),
                 usuario_logado: UserResponse = Depends(obter_usuario_logado)
                 ) -> ProductsResponse:
    if usuario_logado.role != "admin" and usuario_logado.role != "vendedor":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores ou vendedores podem editar produtos"
        )
    product_response: ProductsM = busca_produto_por_id(product_id, db)
    product_response.productName = product_request_data.productName
    product_response.productImageUrl = product_request_data.productImageUrl
    product_response.productPrice = product_request_data.productPrice
    product_response.productDesc = product_request_data.productDesc
    product_response.productCategory = product_request_data.productCategory
    product_response.productAmount = product_request_data.productAmount
    product_response.productAmountSuggestion = product_request_data.productAmountSuggestion
    db.add(product_response)
    db.commit()
    db.refresh(product_response)
    return product_response


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int,
                   db: Session = Depends(get_db), usuario_logado: UserResponse = Depends(obter_usuario_logado)) -> None:
    if usuario_logado.role != "admin" and usuario_logado.role != "vendedor":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores ou vendedores podem apagar produtos"
        )
    product_deleted = busca_produto_por_id(product_id, db)
    db.delete(product_deleted)
    db.commit()


def busca_produto_por_id(product_id: int, db: Session) -> ProductsM:
    produto_por_id = db.query(ProductsM).get(product_id)

    if produto_por_id is None:
        raise NotFound("Produto")

    return produto_por_id
