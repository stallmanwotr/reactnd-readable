import React, { Component } from 'react';
import './NotFoundPage.css';

/**
 * A "404 Not Found" error page. 
 *   Shown when the user navigate to a URL path/route that is not known, or to a
 * category/post that is deleted.
 */
class NotFoundPage extends Component {

    render() {
        return (
            <div className="rd-not-found-page">
                <p className="rd-not-found-header">404 Not Found</p>
                <p className="rd-not-found-body">The requested page was not found.</p>
            </div>
        );
    };
}

export default NotFoundPage;


