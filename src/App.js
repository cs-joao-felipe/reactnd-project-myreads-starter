import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelfs from './components/BookShelfs'
import * as BooksAPI from './services/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    library: [],
    search_results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((library) => {
      this.setState({ library })
    })
  }

  handleSearchChange = (query) => {
    if (query === '') {
      this.setState({ search_results: [] })
    } else {
      BooksAPI
        .search(query)
        .then((search_results) => {
          this.setState({ search_results })
        })
        .catch(err => {
          console.log(err)
          this.setState({ search_results: [], error: err })
        })
    }
  }

  handleBookShelfChange = (book_id, shelf) => {
    BooksAPI
      .update(book_id, shelf)
      .then(BooksAPI
        .getAll()
        .then((library) => {
          this.setState({ library })
        }))
  }

  render() {
    const { library, search_results, error } = this.state
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks books={search_results} onSearchUpdate={this.handleSearchChange} onShelfUpdate={this.handleBookShelfChange} error={error} />
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
