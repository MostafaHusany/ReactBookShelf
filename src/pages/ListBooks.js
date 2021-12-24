import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';

const ListBooks = ({ books_list, updateBookList }) => {
    console.log('test 2', books_list);
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading" updateBookList={updateBookList} books_list={books_list.filter(book => book.shelf === "currentlyReading")} />
                    <BookShelf title="Want To Read" updateBookList={updateBookList} books_list={books_list.filter(book => book.shelf === "wantToRead")} />
                    <BookShelf title="Read" updateBookList={updateBookList} books_list={books_list.filter(book => book.shelf === "read")} />
                </div>
            </div>
            <div className="open-search">
              <Link className="button" to="/search-book" >Add a book</Link>
            </div>
        </div>
    )
}

export default ListBooks;