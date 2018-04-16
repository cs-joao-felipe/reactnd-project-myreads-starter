import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

    static PropTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        const {title, books} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) =>
                            <Book key={book.id} bookToRender={book} />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf