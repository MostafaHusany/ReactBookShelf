import React from 'react';
import Book from '../components/Book';

const BookShelf = ({ title, books_list, updateBookList, listed_books_shelf}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books_list.map(book => {
                            return <Book listed_books_shelf={listed_books_shelf} updateBookList={updateBookList} key={book.id} book={book} />
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;