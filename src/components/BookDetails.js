import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookDetails extends Component {

    static propTypes = {
        bookToRender: PropTypes.object.isRequired,
        onCloseModal: PropTypes.func.isRequired,
        show: PropTypes.bool,
    }

    render() {
        const { bookToRender, onCloseModal } = this.props
        return (
            <div className='book-details-background'>
                <div className='book-detail-left'>
                    {(bookToRender.imageLinks) &&
                        <div
                            className='book-cover'
                            style={{ width: 128, height: 193, backgroundImage: `url(${bookToRender.imageLinks.thumbnail})` }}>
                        </div>
                    }
                    <div className='book-detail-label'>Title</div>
                    <div className='book-detail-text'>{bookToRender.title}</div>
                    <div className='book-detail-label'>Authors</div>
                    {(bookToRender.authors) &&
                        <div className='book-detail-text'>{bookToRender.authors.toString()}</div>
                    }
                    <div className='book-detail-label'>Publisher</div>
                    <div className='book-detail-text'>{bookToRender.publisher}</div>
                    <div className='book-detail-label'>Published On</div>
                    <div className='book-detail-text'>{bookToRender.publishedDate}</div>
                    <div className='book-detail-label'>Pages</div>
                    <div className='book-detail-text'>{bookToRender.pageCount}</div>
                </div>
                <div className='book-details-right'>
                    <button className='book-detail-close-button' onClick={onCloseModal} >
                        Close &times;
                    </button>
                    <div className='book-detail-label'>Description</div>
                    <div className='book-detail-text'>{bookToRender.description}</div>
                </div>
            </div>

        )
    }
}

export default BookDetails;