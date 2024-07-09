from fastapi import status, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import JWTError
from fastapi.security import OAuth2PasswordBearer
from shared.dependencies import get_db
from auth.models.user_model import User as UserModel
from shared.providers.token_provider import verificar_acess_token

oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')


def obter_usuario_logado(token: str = Depends(oauth2_schema),
                         db: Session = Depends(get_db)):
    try:
        username: str = verificar_acess_token(token)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='token invalido')
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='token invalido')

    existing_user = db.query(UserModel).filter(UserModel.username == username).first()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail='token invalido')
    print(existing_user)
    return existing_user
