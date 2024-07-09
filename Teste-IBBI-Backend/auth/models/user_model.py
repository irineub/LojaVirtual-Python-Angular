from sqlalchemy import Column, Integer, String, Boolean, UniqueConstraint

from shared.database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    username = Column('username', String, nullable=False, unique=True)
    password = Column('password', String, nullable=False)
    role = Column('role', String, nullable=False)

    __table_args__ = (
        UniqueConstraint('username', name='unique_username'),
    )