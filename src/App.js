import React from 'react';
import * as BooksAPI from './BooksAPI'
import { Route , Switch } from 'react-router-dom';
import './App.css';
import ListBooks from './pages/ListBooks';
import SearchBook from './pages/SearchBook';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books_list : [],
    listed_books_shelf : {},
    search_list : [],
    showSearchPage: false
  }

  componentDidMount () {
    BooksAPI.getAll().then(res => {
      // create a hash for the books shelf
      let listed_books_shelf = {};
      res.forEach(book => {
        listed_books_shelf[book.id] = book.shelf 
      });

      this.setState({
        books_list : res,
        listed_books_shelf : listed_books_shelf
      });

      console.log(this.state.listed_books_shelf)
    })
  }// end :: componentDidMount

  filterList = (val) => {
    if (val === '') {
      this.setState({
        search_list : []
      });
    } else {
      BooksAPI.search(val).then(res => {
        if (res.error == null) {
          this.setState({
            search_list : res
          });
        } else {
          this.setState({
            search_list : []
          });
        }
        console.log(res);
      });
    }
  }

  updateBookListState = (new_book) => {
    // get ride of the old book from the book_list
    let new_book_list = this.state.books_list.filter(book => book.id !== new_book.id);
    new_book_list.push(new_book);

    let listed_books_shelf = {};
    new_book_list.forEach(book => {
      listed_books_shelf[book.id] = book.shelf 
    });

    this.setState({
      books_list : new_book_list,
      listed_books_shelf : listed_books_shelf
    });
  }

  updateBookList = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      book.shelf = shelf; 
      this.updateBookListState(book);
    });
  }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route exact path="/" render={() => <ListBooks listed_books_shelf={this.state.listed_books_shelf} updateBookList={this.updateBookList} books_list={this.state.books_list} /> } />
        <Route exact path="/search" render={() => <SearchBook listed_books_shelf={this.state.listed_books_shelf} updateBookList={this.updateBookList} filterList={this.filterList} books_list={this.state.search_list} /> } />
      </Switch>
      </div>
    )
  }
}

export default BooksApp
