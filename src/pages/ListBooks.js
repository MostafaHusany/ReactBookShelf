import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';

const ListBooks = ({ books_list, updateBookList, listed_books_shelf }) => {
    console.log('test 2', books_list);
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading" listed_books_shelf={listed_books_shelf} updateBookList={updateBookList} books_list={books_list.filter(book => book.shelf === "currentlyReading")} />
                    <BookShelf title="Want To Read" listed_books_shelf={listed_books_shelf} updateBookList={updateBookList} books_list={books_list.filter(book => book.shelf === "wantToRead")} />
                    <BookShelf title="Read" listed_books_shelf={listed_books_shelf} updateBookList={updateBookList} books_list={books_list.filter(book => book.shelf === "read")} />
                </div>
            </div>
            <div className="open-search">
              <Link className="button" to="/search" >Add a book</Link>
            </div>
        </div>
    )
}

export default ListBooks;