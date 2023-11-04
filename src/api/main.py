from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from pydantic import BaseModel
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

CORS(app, resources={r"*": {"origins": "*"}})

class AuthorModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    books = db.relationship('BookModel', backref='author', lazy=True)

class BookModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    page_count = db.Column(db.Integer, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('author_model.id'), nullable=False)

    def as_json(self):
        return 
        {
            "id" : self.id,
            "name" : self.name,
            "page_count" : self.page_count,
            "author_id" : self.author_id
        }

def clear_database():
    # Delete all records from the BookModel table
    BookModel.query.delete()
    AuthorModel.query.delete()
    
    # Commit the changes to the database
    db.session.commit()


class Author(BaseModel):
    name: str

class Book(BaseModel):
    name: str
    page_count: int
    author_id: int

@app.route('/add-author', methods=['POST'])
def create_author():
    data = request.get_json()
    author = AuthorModel(name=data['name'])
    db.session.add(author)
    db.session.commit()
    return jsonify({"message": "Author created successfully"}), 201

@app.route('/authors', methods=['GET'])
def get_authors():
    authors = AuthorModel.query.all()
    return jsonify([{"id": author.id, "name": author.name , "books" : [{"name" : b.name , "page_count" : b.page_count} for b in author.books]} for author in authors])

@app.route('/authors/<int:id>', methods=['GET'])
def get_author(author_id):
    author = AuthorModel.query.get(author_id)
    if not author:
        return jsonify({"message": "Author not found"}), 404
    return jsonify({"id": author.id, "name": author.name})

@app.route('/update-authors/<int:id>', methods=['PUT'])
def update_author(id):
    data = request.get_json()
    author = AuthorModel.query.get(id)
    
    print(data)
    if not author:
        return jsonify({"message": "Author not found"}), 404
    
    if 'name' in data:
        author.name = data['name']
    
    if 'books' in data:
        for book_data in data['books']:
            book_name = book_data.get('name')
            page_count = book_data.get('page_count')
            
            existing_book = BookModel.query.filter_by(name=book_name, author_id=author.id).first()
            
            if existing_book:
                # Update an existing book
                existing_book.name = book_name
                existing_book.page_count = page_count
            else:
                # Create a new book
                new_book = BookModel(name=book_name, page_count=page_count, author=author)
                db.session.add(new_book)
    
    db.session.commit()
    return jsonify({"id": author.id, "name": author.name})

@app.route('/delete-author/<int:id>' , methods = ['DELETE'])
def delete_author(id):
    author = AuthorModel.query.get(id)
    if not author: 
        return jsonify({"message": "Author not found"}), 404
    else:
        db.session.delete(author)
        db.session.commit()
        return jsonify({"message": "Author deleted successfully"}), 200
        

@app.route('/add-book', methods=['POST'])
def create_book():
    data = request.get_json()
    author = AuthorModel.query.get(data['author_id'])
    if not author:
        return jsonify({"message": "Author not found"}), 404
    book = BookModel(name=data['name'], page_count=data['page_count'], author_id=author.id)
    books = BookModel.query.all()

    book_present = BookModel.query.filter(BookModel.name == data['name']).all()

    if book_present and len(books)>0:
        return jsonify({"message" : "Book is already present"}) , 231
    
    db.session.add(book)
    db.session.commit()
    return jsonify({"message": "Book created successfully"}), 201

@app.route('/delete-book/<int:id>' , methods = ['DELETE'])
def delete_book(id):
    book_obt = BookModel.query.get(id)
    if not book_obt: 
        return jsonify({"message": "Book not found"}), 404
    else:
        db.session.delete(book_obt)
        db.session.commit()
        return jsonify({"message": "Book deleted successfully"}), 200

@app.route('/update-book/<int:id>', methods=['PUT'])
def update_book(id):
    data = request.get_json()
    book = BookModel.query.get(id)
    
    if not book:
        return jsonify({"message": "Book not found"}), 404
    
    book.name = data['name']
    book.page_count = data['page_count']
    db.session.commit()
    return jsonify({"id": book.id, "name": book.name})

@app.route('/books', methods=['GET'])
def get_books():
    books = BookModel.query.all()
    return jsonify([{"id": book.id, "name": book.name, "page_count": book.page_count, "author_id": book.author_id} for book in books])


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
