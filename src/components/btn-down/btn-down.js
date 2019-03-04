import React, { Component } from 'react';

export default class BtnDown extends Component {
    render() {
        const {switchDown, idOfSqr, disabled} = this.props;
        return (
            <button
                className="btn"
                disabled={disabled}
                type="button"
                data-btn-id={idOfSqr}
                onClick={(event) => switchDown(event)}
            >↓</button>
        );
    }
}








