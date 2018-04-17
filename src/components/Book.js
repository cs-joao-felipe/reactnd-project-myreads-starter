import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import BookDetail from './BookDetails'

class Book extends Component {

    constructor() {
        super()
        this.state = {
            showDetail: false
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    static PropTypes = {
        bookToRender: PropTypes.object.isRequired,
        onShelfUpdate: PropTypes.func.isRequired
    }

    handleOpenModal = () => {
        this.setState({ showDetail: true });
    }

    handleCloseModal = () => {
        this.setState({ showDetail: false });
    }

    render() {
        const { showDetail } = this.state
        const { bookToRender, onShelfUpdate } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <a onClick={this.handleOpenModal}>
                        {(bookToRender.imageLinks) &&
                            <div
                                className="book-cover"
                                style={{ width: 128, height: 193, backgroundImage: `url(${bookToRender.imageLinks.thumbnail})` }}>
                            </div>
                        }
                    </a>
                    <div className="book-shelf-changer">
                        <select value={bookToRender.shelf || 'none'} onChange={(event) => onShelfUpdate(bookToRender.id, event.target.value)}>
                            <option value="" disabled>Move to...</option>
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
                <Modal
                    isOpen={showDetail}
                    contentLabel={`${bookToRender.title} Details`}>
                    <BookDetail bookToRender={bookToRender} />
                    <button onClick={this.handleCloseModal}>Close</button>
                </Modal>
                {(bookToRender.shelf === 'currentlyReading') &&
                    <a target='_blank'
                        className="twitter-share-button"
                        href={`https://www.twitter.com/intent/tweet?text=I%20am%20currently%20reading%20${bookToRender.title}&hashtags=MyReads,Udacity,React`}
                    >
                        Tweet
                    </a>
                }
            </div>
        )
    }
}

export default Book