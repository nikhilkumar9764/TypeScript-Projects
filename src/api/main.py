from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, relationship
from pydantic import BaseModel
from passlib.context import CryptContext
from typing import List

app = FastAPI()

DATABASE_URL = "sqlite:///./test.db"  
engine = create_engine(DATABASE_URL)
SessionLocal = Session(engine)
Base = declarative_base()


class Author(Base):
    __tablename__ = "authors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    books = relationship("Book", back_populates="author")


class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    page_count = Column(Integer)
    author_id = Column(Integer, ForeignKey("authors.id"))
    author = relationship("Author", back_populates="books")

Base.metadata.create_all(bind=engine)

class AuthorBase(BaseModel):
    name: str

class AuthorCreate(AuthorBase):
    pass

class Author(AuthorBase):
    id: int
    books: List[Book]

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True

class BookBase(BaseModel):
    name: str
    page_count: int

class BookCreate(BookBase):
    author_id: int

class Book(BookBase):
    id: int
    author: Author

    class Config:
        orm_mode = True

SECRET_KEY = "k1e2y3imp4ort5ant6" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# User authentication (dummy user for now)
fake_users_db = {
    "testuser": {
        "username": "testuser",
        "password": "testpassword"
    }
}

class User(BaseModel):
    username: str
    password: str

def create_access_token(data: dict, expires_delta: int):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = fake_users_db.get(token)
    if user is None:
        raise credentials_exception
    return User(**user)

# API routes
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if user_dict is None or not pwd_context.verify(form_data.password, user_dict["password"]):
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def get_author(db: Session, author_id: int):
    return db.query(Author).filter(Author.id == author_id).first()


def get_authors(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Author).offset(skip).limit(limit).all()


def create_author(db: Session, author: AuthorCreate):
    db_author = Author(**author.dict())
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

# Define a function to update an author by ID
def update_author(db: Session, author_id: int, updated_author: AuthorCreate):
    db_author = db.query(Author).filter(Author.id == author_id).first()
    if db_author:
        for field, value in updated_author.dict().items():
            setattr(db_author, field, value)
        db.commit()
        db.refresh(db_author)
        return db_author
    return None

# Define a function to get a single book by ID
def get_book(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()

# Define a function to get a list of books with pagination
def get_books(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Book).offset(skip).limit(limit).all()

# Define a function to create a new book
def create_book(db: Session, book: BookCreate):
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

# Define a function to update a book by ID
def update_book(db: Session, book_id: int, updated_book: BookCreate):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book:
        for field, value in updated_book.dict().items():
            setattr(db_book, field, value)
        db.commit()
        db.refresh(db_book)
        return db_book
    return None

# ...

# Update your /authors and /books routes to use these functions
@app.get("/authors", response_model=List[Author])
def get_authors(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    authors = get_authors(db, skip, limit)
    return authors

@app.post("/authors", response_model=Author)
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    new_author = create_author(db, author)
    return new_author

@app.put("/authors/{author_id}", response_model=Author)
def update_author(author_id: int, updated_author: AuthorCreate, db: Session = Depends(get_db)):
    author = update_author(db, author_id, updated_author)
    if author:
        return author
    raise HTTPException(status_code=404, detail="Author not found")

@app.get("/books", response_model=List[Book])
def get_books(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    books = get_books(db, skip, limit)
    return books

@app.post("/books", response_model=Book)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    new_book = create_book(db, book)
    return new_book

@app.put("/books/{book_id}", response_model=Book)
def update_book(book_id: int, updated_book: BookCreate, db: Session = Depends(get_db)):
    book = update_book(db, book_id, updated_book)
    if book:
        return book
    raise HTTPException(status_code=404, detail="Book not found")
