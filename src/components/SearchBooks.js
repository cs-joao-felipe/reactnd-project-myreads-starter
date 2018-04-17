import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {

    static PropTypes = {
        library: PropTypes.instanceOf(Map).isRequired,
        books: PropTypes.instanceOf(Map).isRequired,
        onShelfUpdate: PropTypes.func.isRequired,
        onSearchUpdate: PropTypes.func.isRequired
    }

    componentWillUnmount() {
        this.props.onSearchUpdate('')
    }

    render() {
        const { library, books, onShelfUpdate, onSearchUpdate } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a href='/' className='close-search'>Close</a>
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
                        {books.size > 0 && Array.from(books.values()).map((book) => {
                            console.log(book.id + ': '+ library.has(book.id) + 'title: '+ book.title)
                            if (library.has(book.id)) {
                                book.shelf = library.get(book.id).shelf
                            }
                            return <Book key={book.id} bookToRender={book} onShelfUpdate={onShelfUpdate} />
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks