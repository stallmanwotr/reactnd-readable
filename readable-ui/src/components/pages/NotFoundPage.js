/* eslint camelcase: 0 */
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
//import { basic_gear } from 'react-icons-kit/linea/basic_gear';
import { weather_cloud_lightning } from 'react-icons-kit/linea/weather_cloud_lightning';
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
                <div className="rd-not-found-icon">
                    <Icon icon={weather_cloud_lightning} size={48}/>
                </div>
                <div className="rd-not-found-content">
                    <p className="rd-not-found-header">404 Not Found</p>
                    <p className="rd-not-found-body">The requested page was not found.</p>
                </div>
            </div>
        );
    };
}

export default NotFoundPage;


