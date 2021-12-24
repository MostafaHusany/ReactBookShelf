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
    search_list : [],
    showSearchPage: false
  }

  componentDidMount () {
    BooksAPI.getAll().then(res => {
      console.log('test did mount', res);
      this.setState({
        books_list : res
      });
    })
  }// end :: componentDidMount

  filterList = (val) => {
    BooksAPI.search(val).then(res => {
      if (res.error == null) {
        this.setState({
          search_list : res
        });
      }
      console.log(res);
    });
  }

  updateBookListState = (new_book) => {
    let new_book_list = this.state.books_list.filter(book => book.id !== new_book.id);
    new_book_list.push(new_book);
    this.setState({
      books_list : new_book_list
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
        <Route exact path="/" render={() => <ListBooks updateBookList={this.updateBookList} books_list={this.state.books_list} /> } />
        <Route exact path="/search-book" render={() => <SearchBook updateBookList={this.updateBookList} filterList={this.filterList} books_list={this.state.search_list} /> } />
      </Switch>
      </div>
    )
  }
}

export default BooksApp
