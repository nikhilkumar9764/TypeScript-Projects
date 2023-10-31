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
    data1 = request.json
    author = AuthorModel.query.get(id)
    if not author:
        return jsonify({"message": "Author not found"}), 404
    
    author.name = data1['name']
    if 'books' in data1:
        for book in data1['books']:
            # Create or update books associated with the author
            book = BookModel.query.filter_by(name=book['name'], author_id=author.id).first()
            if not book:
                default_pgs = book['page_count']
                book = BookModel(name=book_name, page_count = default_pgs ,author_id=author.id)
                db.session.add(book)

    db.session.commit()
    return jsonify({"id": author.id, "name": author.name}) , 201

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

@app.route('/books', methods=['GET'])
def get_books():
    books = BookModel.query.all()
    return jsonify([{"id": book.id, "name": book.name, "page_count": book.page_count, "author_id": book.author_id} for book in books])


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
