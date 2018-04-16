import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from '../services/BooksAPI'

class SearchBooks extends Component {

    state = {
        query: '',
        books: []
    }

    static PropTypes = {
        onShelfUpdate: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        BooksAPI.search(this.state.query)
            .then((books) => {
                this.setState({ books })
            })
    }

    render() {
        const { books, query } = this.state
        const { onShelfUpdate } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books && books.length !== 0 && books.map((book) =>
                            <Book key={book.id} bookToRender={book} onShelfUpdate={onShelfUpdate} />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks