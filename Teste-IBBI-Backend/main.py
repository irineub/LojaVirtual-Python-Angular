import uvicorn
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from auth.routers import auth_router
from auth.routers.auth_router import create_admin_user
from products.routers import products_router, productCategories_router, buy_products_router
from shared.dependencies import get_db
from shared.exceptions import NotFound
from shared.exceptions_handler import not_found_exception_handler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],

)

# Exceções
app.add_exception_handler(NotFound, not_found_exception_handler)

# Rotas de Produtos
app.include_router(products_router.router)

# Rotas de Categorias
app.include_router(productCategories_router.router)

# Rotas de Compra:
app.include_router(buy_products_router.router)

# Rotas de Segurança: Autenticação e Autorização
app.include_router(auth_router.router)


def on_startup():
    db: Session = next(get_db())
    create_admin_user(db)

app.add_event_handler("startup", on_startup)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
