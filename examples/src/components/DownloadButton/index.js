import React, { Component, PropTypes } from 'react';
import DownloadIcon from './icon';

class DownloadButton extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <button
                title="Download"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    float: 'left',
                    height: 40,
                    outline: 'none',
                    padding: 10,
                    position: 'relative',
                    left: -10,
                    top: 0,
                    verticalAlign: 'bottom',
                    width: 40,
                }}
                onClick={this.props.handler}
            >
                <span
                    dangerouslySetInnerHTML={{ __html: DownloadIcon }}
                />
            </button>
        )
    }
}

export default DownloadButton;
