from datetime import datetime, timedelta
from jose import jwt

# CONFIG
SECRET_KEY = 'f2d941b153fd9e14fe0210519f3d04af'
ALGORITHM = 'HS256'
EXPIRES_IN_MIN = 720


def create_acess_token(data: dict):
    dados = data.copy()
    expiracao = datetime.utcnow() + timedelta(minutes=EXPIRES_IN_MIN)
    dados.update({'exp': expiracao})
    token_jwt = jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt


def verificar_acess_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload.get('sub')

