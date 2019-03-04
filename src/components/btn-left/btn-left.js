import React, { Component } from 'react';

export default class BtnLeft extends Component {
    render() {
        const {switchLeft, idOfSqr, disabled} = this.props;
        return (
            <button
                className="btn"
                disabled={disabled}
                type="button"
                data-btn-id={idOfSqr}
                onClick={(event) => switchLeft(event)}
            >←</button>
        );
    }
}




