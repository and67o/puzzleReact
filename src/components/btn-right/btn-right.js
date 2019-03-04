import React, { Component } from 'react';

export default class BtnRight extends Component {
    render() {
        const {switchRight, idOfSqr, disabled} = this.props;
        return (
            <button
                className="btn"
                disabled={disabled}
                type="button"
                data-btn-id={idOfSqr}
                onClick={(event) => switchRight(event)}
            >→</button>
        );
    }
}








