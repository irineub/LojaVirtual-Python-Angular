from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from auth.models.user_model import User as UserModel
from shared.dependencies import get_db
from auth.routers.auth_utils import obter_usuario_logado
from shared.exceptions import NotFound
from shared.providers.hash_provider import gerar_hash, verificar_hash
from shared.providers.token_provider import create_acess_token

router = APIRouter(prefix="/auth")


class UserResponse(BaseModel):
    id: int
    username: str
    role: str


class UserUpdate(BaseModel):
    username: str
    role: str


class UserRequest(BaseModel):
    username: str
    password: str


class LoginSucessResponse(BaseModel):
    username: str
    role: str
    access_token: str


def create_admin_user(db: Session = Depends(get_db)):
    username = "admin"
    password = "admin"
    hashed_password = gerar_hash(password)

    existing_user = db.query(UserModel).filter(UserModel.username == username).first()
    if existing_user:
        return  
    new_user = UserModel(
        username=username,
        password=hashed_password,
        role="admin"
    )

    try:
        db.add(new_user)
        db.commit()
    except IntegrityError:
        db.rollback()
        raise Exception("Failed to create admin user")


@router.get("/roles")
def cargos(usuario_logado: UserResponse = Depends(obter_usuario_logado)):
    print(usuario_logado.role)
    return {"cliente", "vendedor", "admin"}


@router.get("/users", response_model=List[UserResponse])
def list_users(db: Session = Depends(get_db), usuario_logado: UserResponse = Depends(obter_usuario_logado)
               ) -> list[UserResponse]:
    if usuario_logado.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores podem ver a lista de usuários"
        )

    return db.query(UserModel).all()


@router.get("/users/{id}", response_model=UserResponse)
def get_product_by_id(
        id: int,
        db: Session = Depends(get_db), usuario_logado: UserResponse = Depends(obter_usuario_logado)
               ) -> list[UserResponse]:
    if usuario_logado.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores podem ver a lista de usuários"
        )
    return busca_usuario_por_id(id, db)


@router.delete("/users/{id}", status_code=204)
def delete_user(
        id: int,
        db: Session = Depends(get_db),
        usuario_logado: UserResponse = Depends(obter_usuario_logado)
) -> None:
    if usuario_logado.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores podem deletar usuários"
        )

    user_deleted = busca_usuario_por_id(id, db)
    if user_deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    db.delete(user_deleted)
    db.commit()


@router.put("/users/{id}", response_model=UserResponse)
def update_user(
        id: int,
        user_data: UserUpdate,
        db: Session = Depends(get_db),
        usuario_logado: UserResponse = Depends(obter_usuario_logado)
) -> UserResponse:
    if usuario_logado.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Apenas administradores podem deletar usuários"
        )

    user_to_update = busca_usuario_por_id(id, db)
    user_to_update.username = user_data.username,
    user_to_update.role = user_data.role,

    try:
        db.commit()
        db.refresh(user_to_update)

        return UserResponse(**user_to_update.__dict__)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update user")


@router.post("/register", response_model=UserResponse, status_code=201)
def signup(user_data: UserRequest, db: Session = Depends(get_db)) -> UserResponse:
    existing_user = db.query(UserModel).filter(UserModel.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Ja Existe um Usuario com esse Nome")

    hashed_password = gerar_hash(user_data.password)
    new_user = UserModel(
        username=user_data.username,
        password=hashed_password,
        role="cliente"
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return UserResponse(**new_user.__dict__)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to register user")


@router.post("/login")
def login(login_data: UserRequest, db: Session = Depends(get_db)):
    username = login_data.username
    password = login_data.password
    existing_user = db.query(UserModel).filter(UserModel.username == username).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="Usuario ou Senha Incorretos")

    valid_password = verificar_hash(password, existing_user.password)

    if not valid_password:
        raise HTTPException(status_code=400, detail="Usuario ou Senha Incorretos")
    token = create_acess_token({'sub': existing_user.username})
    return LoginSucessResponse(username=existing_user.username, role=existing_user.role, access_token=token)


def busca_usuario_por_id(id: int, db: Session) -> UserModel:
    usuario_por_id = db.query(UserModel).get(id)

    if usuario_por_id is None:
        raise NotFound("Usuario")

    return usuario_por_id
