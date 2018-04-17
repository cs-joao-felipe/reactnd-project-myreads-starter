import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class BookShelfs extends Component {
    static PropTypes = {
        books: PropTypes.instanceOf(Map).isRequired,
        onShelfUpdate: PropTypes.func.isRequired
    }

    filter = (books, category) => {
        let filtered_books = Array.from(books.values()).filter((b) => b.shelf === category)
        console.log(filtered_books)
        return filtered_books
    }

    render() {
        const WANT_TO_READ = { title: 'Want To Read', category: 'wantToRead' }
        const CURRENTLY_READING = { title: 'Currently Reading', category: 'currentlyReading' }
        const READ = { title: 'Read', category: 'read' }
        const { books, onShelfUpdate } = this.props
        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf title={CURRENTLY_READING.title} books={this.filter(books, CURRENTLY_READING.category)} onShelfUpdate={onShelfUpdate} />
                        <Shelf title={WANT_TO_READ.title} books={this.filter(books, WANT_TO_READ.category)} onShelfUpdate={onShelfUpdate} />
                        <Shelf title={READ.title} books={this.filter(books, READ.category)} onShelfUpdate={onShelfUpdate} />
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default BookShelfs