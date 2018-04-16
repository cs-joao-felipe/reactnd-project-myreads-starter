import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelfs from './components/BookShelfs'
import * as BooksAPI from './services/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleBookShelfChange = (book_id, shelf) => {
    BooksAPI
      .get(book_id)
      .then((book) => {
        BooksAPI
          .update(book, shelf)
          .then(BooksAPI
            .getAll()
            .then((books) => {
              this.setState({ books })
            }))
      })

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks onShelfUpdate={this.handleBookShelfChange} />
        )}
        />
        <Route exact path='/' render={() => (
          <BookShelfs books={this.state.books} onShelfUpdate={this.handleBookShelfChange} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
