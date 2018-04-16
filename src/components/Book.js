import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static PropTypes = {
        bookToRender: PropTypes.object.isRequired,
        onShelfUpdate: PropTypes.func.isRequired
    }

    render() {
        const { bookToRender,onShelfUpdate } = this.props
        return (
            <div className="book">
                <div className="book-top">
                {(bookToRender.imageLinks) &&
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookToRender.imageLinks.thumbnail})` }}></div>
                }
                    <div className="book-shelf-changer">
                        <select value={bookToRender.shelf || 'none'} onChange={(event) => onShelfUpdate(bookToRender.id, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookToRender.title}</div>
                {(bookToRender.authors) &&
                    <div className="book-authors">{bookToRender.authors.toString()}</div>
                }
            </div>
        )
    }
}

export default Book