import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';
import { chevronUp } from 'react-icons-kit/fa/chevronUp';
import './UpDownButtons.css';

/**
 * A pair of voting up/down buttons.
 */
class UpDownButtons extends Component {
    render() {
        return (
            <div className="rd-up-down-buttons">
                <Icon icon={chevronUp} size={16} />
                <Icon icon={chevronDown} size={16} />
            </div>
        );
    };
}

export default UpDownButtons;
