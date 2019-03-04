import React, {Component} from 'react';
import './app.css';

import BtnLeft from '../btn-left';
import BtnRight from '../btn-right';
import BtnTop from '../btn-top';
import BtnDown from '../btn-down';

export default class App extends Component {

    state = {
        infoSqr: this.squWithImg(),
        disabledBtn: {
            left: this.disabledBtnLeft(),
            right: this.disabledBtnRight(),
            top: this.disabledBtnTop(),
            down: this.disabledBtnDown(),
        }
    };

    disabledBtnRight() {
        return [2, 5, 8];
    }

    disabledBtnLeft() {
        return [0, 3, 6];
    }

    disabledBtnTop() {
        return [0, 1, 2];
    }

    disabledBtnDown() {
        return [6, 7, 8];
    }

    squWithImg() {
       let arrSqr = [];
       for (let sqrId = 0; sqrId < 9; sqrId++) {
           arrSqr.push({
               id: sqrId,
               classN: 'sqr-' + sqrId,
               left: this.disabledBtnLeft().indexOf(sqrId) > -1,
               right: this.disabledBtnRight().indexOf(sqrId) > -1,
               top: this.disabledBtnTop().indexOf(sqrId) > -1,
               down: this.disabledBtnDown().indexOf(sqrId) > -1,

           });
       }
       return arrSqr;
    }

    switchForLeftAndRight(event, side) {
        const idSqrClick = parseInt(event.target.dataset.btnId);
        this.setState(({ infoSqr }) => {
            const handleInfoSqr = [];
            handleInfoSqr['clickedSqr'] = infoSqr.find(item => item.id === idSqrClick);
            handleInfoSqr['indexClickedSqr'] = infoSqr.findIndex(item => item === handleInfoSqr['clickedSqr']);
            handleInfoSqr['indexWhatChange'] = handleInfoSqr['indexClickedSqr'] + side;
            const changedSqr = [
                this.btnSqr(infoSqr[handleInfoSqr['indexWhatChange']], handleInfoSqr['indexClickedSqr']),
                this.btnSqr(handleInfoSqr['clickedSqr'], handleInfoSqr['indexWhatChange']),
            ];
            return {
                infoSqr: [
                    ...infoSqr.slice(0, (side === 1) ? handleInfoSqr['indexClickedSqr'] : handleInfoSqr['indexWhatChange']),
                    ...(side === 1) ? changedSqr : changedSqr.reverse(),
                    ...infoSqr.slice(((side === 1) ? handleInfoSqr['indexWhatChange'] : handleInfoSqr['indexClickedSqr'])+1)
                ],
            }
        });
    }

    switchTopDown(event, side) {
        const idSqrClick = parseInt(event.target.dataset.btnId);
        this.setState(({ infoSqr }) => {
            const handleTopDown = [];
            handleTopDown['whatChange'] = infoSqr.find(item => item.id === idSqrClick);
            handleTopDown['indexWhatChange'] = infoSqr.findIndex(item => item === handleTopDown['whatChange']);
            handleTopDown['indexWithChange'] = handleTopDown['indexWhatChange'] + side;
            handleTopDown['withChange'] = infoSqr[handleTopDown['indexWithChange']];
            const indexWithWhat = (side === -3) ? handleTopDown['indexWithChange'] : handleTopDown['indexWhatChange'];
            const indexWhatWith = (side === -3) ? handleTopDown['indexWhatChange'] : handleTopDown['indexWithChange'];
            return {
                infoSqr: [
                    ...infoSqr.slice(0, indexWithWhat),
                    this.btnSqr((side === -3) ? handleTopDown['whatChange'] : handleTopDown['withChange'], indexWithWhat),
                    ...infoSqr.slice(indexWithWhat+1, indexWhatWith),
                    this.btnSqr((side === -3) ? handleTopDown['withChange'] : handleTopDown['whatChange'], indexWhatWith),
                    ...infoSqr.slice(indexWhatWith+1),
                ],
            }
        });
    }

    switchRight = (event) => {
        this.switchForLeftAndRight(event, 1);
    };

    switchLeft = (event) => {
        this.switchForLeftAndRight(event, -1);
    };

    switchTop = (event) => {
        return this.switchTopDown(event, -3);
    };

    switchDown = (event) => {
        return this.switchTopDown(event, 3);
    };

    btnSqr(sqr, index) {
        const {disabledBtn} = this.state;
        Object.keys(disabledBtn).forEach(side => {
            sqr[side] = disabledBtn[side].indexOf(index)> -1;
        });
        return sqr;
    }

    render() {
        const { infoSqr } = this.state;
        const sqrs = infoSqr.map(({id, classN, left, right, top, down}) => {
            return (
                <div
                    className={`sqr ${classN}`}
                    data-id={id}
                    key={id}
                >
                    <div className="side-one">
                        <BtnLeft
                            switchLeft={this.switchLeft}
                            idOfSqr={id}
                            disabled={left}
                        />
                        <BtnRight
                            switchRight={this.switchRight}
                            idOfSqr={id}
                            disabled={right}
                        />
                    </div>
                    <div className="side-two">
                        <BtnTop
                            switchTop={this.switchTop}
                            idOfSqr={id}
                            disabled={top}
                        />
                        <BtnDown
                            switchDown={this.switchDown}
                            idOfSqr={id}
                            disabled={down}
                        />
                    </div>
                </div>
            );
        });

        return (
            <div className="container">{sqrs}</div>
        );
    }
}