import React from 'react'

function BookDetails(props) {
    return (
        <div className='book-details-background'>
            <div className='book-detail-left'>
                {(props.bookToRender.imageLinks) &&
                    <div
                        className='book-cover'
                        style={{ width: 128, height: 193, backgroundImage: `url(${props.bookToRender.imageLinks.thumbnail})` }}>
                    </div>
                }
                <div className='book-detail-label'>Title</div>
                <div className='book-detail-text'>{props.bookToRender.title}</div>
                <div className='book-detail-label'>Authors</div>
                {(props.bookToRender.authors) &&
                    <div className='book-detail-text'>{props.bookToRender.authors.toString()}</div>
                }
                <div className='book-detail-label'>Publisher</div>
                <div className='book-detail-text'>{props.bookToRender.publisher}</div>
                <div className='book-detail-label'>Published On</div>
                <div className='book-detail-text'>{props.bookToRender.publishedDate}</div>
                <div className='book-detail-label'>Pages</div>
                <div className='book-detail-text'>{props.bookToRender.pageCount}</div>
            </div>
            <div className='book-details-right'>
                <button className='book-detail-close-button' onClick={props.onCloseModal} >
                    Close &times;
                    </button>
                <div className='book-detail-label'>Description</div>
                <div className='book-detail-text'>{props.bookToRender.description}</div>
            </div>
        </div>

    )
}

export default BookDetails