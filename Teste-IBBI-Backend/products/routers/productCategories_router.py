from typing import List, Type

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from products.models.products_model import ProductCategoriesM
from shared.dependencies import get_db
from shared.exceptions import NotFound
from auth.routers.auth_utils import obter_usuario_logado

router = APIRouter(prefix="/categories")


class UserResponse(BaseModel):
    id: int
    username: str
    role: str


class CategoriesResponse(BaseModel):
    categoryId: int
    categoryName: str
    categoryDesc: str


class CategoriesRequest(BaseModel):
    categoryName: str
    categoryDesc: str


@router.get("", response_model=List[CategoriesResponse])
def list_categories(db: Session = Depends(get_db)) -> list[CategoriesResponse]:
    return db.query(ProductCategoriesM).all()


@router.get("/{category_id}", response_model=CategoriesResponse)
def get_category_by_id(
        category_id: int,
        db: Session = Depends(get_db)) -> CategoriesResponse:
    return busca_categoria_por_id(category_id, db)


@router.post("", response_model=CategoriesResponse, status_code=201)
def new_category(category_request_data: CategoriesRequest, db: Session = Depends(get_db),
        usuario_logado: UserResponse = Depends(obter_usuario_logado)) -> CategoriesResponse:
    if usuario_logado.role != "admin" and usuario_logado.role != "vendedor":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores ou vendedores podem criar categorias"
        )
    categories_data = ProductCategoriesM(
        categoryName=category_request_data.categoryName,
        categoryDesc=category_request_data.categoryDesc,

    )
    db.add(categories_data)
    db.commit()
    db.refresh(categories_data)
    return CategoriesResponse(**categories_data.__dict__)


@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int,
                    db: Session = Depends(get_db),
        usuario_logado: UserResponse = Depends(obter_usuario_logado)) -> None:
    if usuario_logado.role != "admin" and usuario_logado.role != "vendedor":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores ou vendedores podem apagar produtos"
        )
    category_deleted = busca_categoria_por_id(category_id, db)
    db.delete(category_deleted)
    db.commit()


def busca_categoria_por_id(category_id: int, db: Session) -> ProductCategoriesM:
    categoria_por_id = db.query(ProductCategoriesM).get(category_id)

    if categoria_por_id is None:
        raise NotFound("Produto")

    return categoria_por_id
