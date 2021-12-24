import React from 'react'

const Book = ({ book, updateBookList, listed_books_shelf}) => {
    let {title, authors, imageLinks, shelf} = book;

    shelf = listed_books_shelf[book.id];
    // console.log(listed_books_shelf, book.id);

    let changeBookShelf = (event) => {
        let shelf = event.target.value;
        updateBookList(book, shelf);
    } 

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={changeBookShelf} defaultValue={shelf == null ? 'none' : shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ title }</div>
                <div className="book-authors">{ authors != null ? authors.join(', ') : '---' }</div>
            </div>
        </li>
    )
}

export default Book;