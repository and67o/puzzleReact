import React, { Component } from 'react';

export default class BtnTop extends Component {
    render() {
        const {switchTop, idOfSqr, disabled} = this.props;
        return (
            <button
                className="btn"
                disabled={disabled}
                type="button"
                data-btn-id={idOfSqr}
                onClick={(event) => switchTop(event)}
            >↑</button>
        );
    }
}








