import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookDetails extends Component {

    static propTypes = {
        bookToRender: PropTypes.object.isRequired,
        show: PropTypes.bool,
    }

    render() {
        const { bookToRender } = this.props
        return (
            <div className="book-details-background">
                <div className="book-details-window">
                    <span><label>Title: </label>{bookToRender.title}</span>
                    <span><label>Subtitle: </label>{bookToRender.subtitle}</span>
                    {JSON.stringify(bookToRender)}
                </div>
            </div>

        )
    }
}

export default BookDetails;