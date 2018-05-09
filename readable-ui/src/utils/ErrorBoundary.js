import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Catches an exception in any child component, and logs the error.
 */
class ErrorBoundary extends Component {
    static propTypes = {
        /** The parent component containing the ErrorBoundary. */
        componentName: PropTypes.string.isRequired,
    }

    state = {
        error: null,
        info: null
    };

    /**
     * Catch errors in any child component and re-render with an error message.
     *
     * @param error An error that has been thrown.
     * @param info An object with a componentStack key. The property has information about
     *        component stack during the thrown error.
     */
    componentDidCatch(error, info) {
        this.logError(error, info);
        this.setState({
            error: error,
            info: info
        });
    }

    logError(error, info) {
        console.error(`ErrorBoundary: Caught an error in ${this.props.componentName}`);
        console.error(`ERROR detail: ${error.toString()}`);
        console.error(`Component Stack:\n${info.componentStack}`);
    }

    render() {
        const { error, info } = this.state;

        // if an error was caught
        if (error) {
            return (
                <div>
                    <h2>Something went wrong...</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br/>
                        {info.componentStack}
                    </details>
                </div>
            );
        }
        // normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;
