import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelfs from './components/BookShelfs'
import * as BooksAPI from './BooksAPI'

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

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )}
        />
        <Route exact path='/' render={({history}) => (
          <BookShelfs books={this.state.books} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
