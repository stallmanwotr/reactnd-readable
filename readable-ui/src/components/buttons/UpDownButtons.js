import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';
import { chevronUp } from 'react-icons-kit/fa/chevronUp';
import './UpDownButtons.css';

/**
 * A pair of voting up/down buttons.
 */
class UpDownButtons extends Component {

    static propTypes = {
        /** Handlers: When the user clicks a button. */
        onClickUp: PropTypes.func,
        onClickDown: PropTypes.func
    }

    render() {
        const { onClickUp, onClickDown } = this.props;

        return (
            <div className="rd-up-down-buttons">
                <div className="rd-button"
                    onClick={() => { if (onClickUp) { onClickUp(); }}} >
                    <Icon icon={chevronUp} />
                </div>
                <div className="rd-button"
                    onClick={() => { if (onClickDown) { onClickDown(); }}} >
                    <Icon icon={chevronDown} />
                </div>
            </div>
        );
    };
}

export default UpDownButtons;
