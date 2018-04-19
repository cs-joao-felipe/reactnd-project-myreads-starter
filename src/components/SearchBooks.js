import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {

    state = {
        selected_for_bulk_update: new Set()
    }

    static PropTypes = {
        library: PropTypes.instanceOf(Map).isRequired,
        books: PropTypes.instanceOf(Map).isRequired,
        onShelfUpdate: PropTypes.func.isRequired,
        onSearchUpdate: PropTypes.func.isRequired,
    }

    handleBulkShelfChange = (shelf) => {
        this.state.selected_for_bulk_update.forEach(book_id => {
            this.props.onShelfUpdate(book_id, shelf)
        })
        this.setState({
            selected_for_bulk_update: new Set()
        })
    }

    toggleBulkUpdate = (book_id) => {
        if (this.state.selected_for_bulk_update.has(book_id)) {
            this.setState((previousState) => ({
                selected_for_bulk_update: previousState.selected_for_bulk_update.delete(book_id)
            }))

        } else {
            this.setState((previousState) => ({
                selected_for_bulk_update: previousState.selected_for_bulk_update.add(book_id)
            }))
        }


    }

    render() {
        const { library, books, onShelfUpdate, onSearchUpdate } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/' >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => onSearchUpdate(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {books.size > 0 &&
                        <div>
                            <label>Bulk Update</label>
                            <select value="" onChange={(event) => { this.handleBulkShelfChange(event.target.value) }}>
                                <option value="" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    }
                    <ol className="books-grid">
                        {books.size > 0 && Array.from(books.values()).map((book) => {
                            if (library.has(book.id)) {
                                book.shelf = library.get(book.id).shelf
                            }
                            return (
                                <div key={`div-${book.id}`}>
                                    {!book.shelf && <input key={`checkbox-${book.id}`} type='checkbox' className='book-checkbox' onChange={(event) => this.toggleBulkUpdate(book.id)} />}
                                    <Book key={book.id} bookToRender={book} onShelfUpdate={onShelfUpdate} />
                                </div>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks