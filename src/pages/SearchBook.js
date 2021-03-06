import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

const SearchBook = ({ books_list, filterList, updateBookList, listed_books_shelf }) => {
    let myTimeout = null;

    let search = event => {
        if (myTimeout != null) {
            clearTimeout(myTimeout);
        }

        // this for not hiting the server aggressively
        let val = event.target.value
        myTimeout = setTimeout(() => {
            filterList(val);
        }, 1000);   
    }

    // clear searcg result when close
    useEffect(() => {
        return () => {
            filterList('');
        }
    }, []);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" >Close</Link>
                <div className="search-books-input-wrapper">
                {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={search} type="text" placeholder="Search by title or author"/>

                </div>
            </div>
            <div className="search-books-results">
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

export default SearchBook;