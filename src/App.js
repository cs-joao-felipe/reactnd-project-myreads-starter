import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelfs from './components/BookShelfs'
import * as BooksAPI from './services/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    library: new Map(),
    search_results: new Map()
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      var library = new Map()
      books.map(book => library.set(book.id, book))

      this.setState({ library })
    })
  }

  handleSearchChange = (query) => {
    if (query === '') {
      this.setState({ search_results: new Map() })
    } else {
      BooksAPI
        .search(query)
        .then((books) => {
          var search_results = new Map()
          books.map(book => search_results.set(book.id, book))
          this.setState({ search_results })
        })
        .catch(err => {
          console.log(err)
          this.setState({ search_results: new Map(), error: err })
        })
    }
  }

  handleBookShelfChange = (book_id, shelf) => {
    let tmp_library = this.state.library
    let tmp_book

    BooksAPI.update(book_id, shelf)
    if (tmp_library.has(book_id)) {
      tmp_book = tmp_library.get(book_id)
    } else {
      BooksAPI.get(book_id).then((book) => {
        tmp_book = book
      })
    }
    tmp_book.shelf = shelf
    tmp_library.set(book_id, tmp_book)
    this.setState((previousState) => ({
      library: previousState.library.set(book_id, tmp_book)
    }))
  }

  render() {
    const { library, search_results, error } = this.state
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks library={library} books={search_results} onSearchUpdate={this.handleSearchChange} onShelfUpdate={this.handleBookShelfChange} error={error} />
        )}
        />
        <Route exact path='/' render={() => (
          <BookShelfs books={library} onShelfUpdate={this.handleBookShelfChange} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
