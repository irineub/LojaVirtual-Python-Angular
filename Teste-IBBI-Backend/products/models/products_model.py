from sqlalchemy import Column, Integer, String, Numeric

from shared.database import Base


class ProductsM(Base):
    __tablename__ = 'products_data'
    productId = Column(Integer, primary_key=True, autoincrement=True)
    productName = Column(String(100))
    productImageUrl = Column(String(100))
    productPrice = Column(Numeric)
    productDesc = Column(String(500))
    productCategory = Column(String(40))
    productAmount = Column(Numeric)
    productAmountSuggestion = Column(Numeric)
    vendorName = Column(String(100), nullable=True)

    class Config:
        from_attributes = True

class ProductCategoriesM(Base):
    __tablename__ = 'product_categories'
    categoryId = Column(Integer, primary_key=True, autoincrement=True)
    categoryName = Column(String(80))
    categoryDesc = Column(String(500))

    class Config:
        from_attributes = True

class ProductSoldM(Base):
    __tablename__ = 'sold_products'
    id = Column(Integer, primary_key=True, autoincrement=True)
    clientName = Column(String(100), nullable=False)
    vendorName = Column(String(100), nullable=False)
    productId = Column(Integer)
    productName = Column(String(100))
    productCategory = Column(String(40))
    soldAmount = Column(Numeric)
    soldTime = Column(String)

    class Config:
        from_attributes = True