import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class BookShelfs extends Component {
    static PropTypes = {
        books: PropTypes.array.isRequired,
    }

    filter = (books, category) => {
        return books.filter((b) => b.shelf === category)
    }

    render() {
        const WANT_TO_READ = { title: 'Want To Read', category: 'wantToRead' }
        const CURRENTLY_READING = { title: 'Currently Reading', category: 'currentlyReading' }
        const READ = { title: 'Read', category: 'read' }
        const { books } = this.props
        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf title={CURRENTLY_READING.title} books={this.filter(books, CURRENTLY_READING.category)} />
                        <Shelf title={WANT_TO_READ.title} books={this.filter(books, WANT_TO_READ.category)} />
                        <Shelf title={READ.title} books={this.filter(books, READ.category)} />
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Search a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default BookShelfs