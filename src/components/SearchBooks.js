import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {

    static PropTypes = {
        books: PropTypes.array.isRequired,
        onShelfUpdate: PropTypes.func.isRequired,
        onSearchUpdate: PropTypes.func.isRequired
    }

    render() {
        const { books, onShelfUpdate, onSearchUpdate } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => onSearchUpdate(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {Array.isArray(books) && books.length > 0 && books.map((book) =>
                            <Book key={book.id} bookToRender={book} onShelfUpdate={onShelfUpdate} />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks