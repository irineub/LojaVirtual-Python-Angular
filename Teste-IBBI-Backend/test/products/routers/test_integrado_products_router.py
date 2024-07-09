from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from shared.database import Base
from shared.dependencies import get_db

client = TestClient(app)

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


def test_deve_listar_produtos():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    client.post("/products", json=dict(productName="Produto Teste", productImageUrl="https://image-produto-test.jpg/",
                                       productPrice=219.0, productDesc="Descrição de produto teste",
                                       productCategory="Produto de teste", productAmount=50,
                                       productAmountSuggestion=50))
    response = client.get("/products")
    assert response.status_code == 200

def test_deve_pegar_produto_por_id():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    response = client.post("/products", json={
        "productName": "Produto Teste",
        "productImageUrl": "https://image-produto-test.jpg/",
        "productPrice": 219.0,
        "productDesc": "Descrição de produto teste",
        "productCategory": "Produto de teste",
        "productAmount": 50,
        "productAmountSuggestion": 50})
    id_do_produto = response.json()['productId']

    response_put = client.get(f"/products/{id_do_produto}")

    assert response_put.status_code == 200
    assert response_put.json()["productPrice"] == 219.0

def test_deve_retornar_nao_encontrado_para_id_inexistente():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    response_put = client.get(f"/products/100")
    assert response_put.status_code == 404



def test_deve_criar_produto():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    novo_produto = {
        "productName": "Produto Teste",
        "productImageUrl": "https://image-produto-test.jpg/",
        "productPrice": 219.55,
        "productDesc": "Descrição de produto teste",
        "productCategory": "Produto de teste",
        "productAmount": 50,
        "productAmountSuggestion": 50

    }

    novo_produto_copy = novo_produto.copy()
    novo_produto_copy["productId"] = 1
    response = client.post("/products", json=novo_produto)
    assert response.status_code == 201
    assert response.json() == novo_produto_copy


def test_deve_atualizar_produto():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    response = client.post("/products", json={
        "productName": "Produto Teste",
        "productImageUrl": "https://image-produto-test.jpg/",
        "productPrice": 219.0,
        "productDesc": "Descrição de produto teste",
        "productCategory": "Produto de teste",
        "productAmount": 50,
        "productAmountSuggestion": 50})
    id_do_produto = response.json()['productId']

    response_put = client.put(f"/products/{id_do_produto}", json={
        "productName": "Produto Teste",
        "productImageUrl": "https://image-produto-test.jpg/",
        "productPrice": 299.0,
        "productDesc": "Descrição de produto teste",
        "productCategory": "Produto de teste",
        "productAmount": 50,
        "productAmountSuggestion": 50})

    assert response_put.status_code == 200
    assert response_put.json()["productPrice"] == 299.0


def test_deve_apagar_produto():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    response = client.post("/products", json={
        "productName": "Produto Teste",
        "productImageUrl": "https://image-produto-test.jpg/",
        "productPrice": 219.0,
        "productDesc": "Descrição de produto teste",
        "productCategory": "Produto de teste",
        "productAmount": 50,
        "productAmountSuggestion": 50})
    id_do_produto = response.json()['productId']

    response_put = client.delete(f"/products/{id_do_produto}")

    assert response_put.status_code == 204
