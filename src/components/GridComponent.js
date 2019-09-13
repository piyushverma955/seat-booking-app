import React, { Component } from 'react';

class GridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booked: [],
            locked: []
        };
    }

    lockSeat(id) {
        var joined = this.state.locked.concat(id);
        this.setState({ locked: joined })
    }

    unlockSeat(id) {
        var joined = this.state.locked.filter(doc=> doc!=id);
        this.setState({ locked: joined })
    }

    bookSeat(ids) {
        var joined = this.state.booked.concat(ids);
        this.setState({ booked: joined });
        this.setState({ locked: [] })
    }

    render() {
        var row = 15, column = 13;
        var rows = [];
        var seq = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        rows = [<div className="row"></div>]
        for (var i = 0; i < row; i++) {
            rows[i] = [<tr key={i}> </tr>]
            rows[i].push(<div className="seatHeader">{seq[i % 26]}</div>)
            for (var j = 0; j < column; j++) {
                let key = i + '-' + j;
                rows[i].push(<td>
                    {(this.state.booked.indexOf(key) < 0) ?
                        ((this.state.locked.indexOf(key) < 0) ?
                            (<div id={key} className="btn" onClick={() => this.lockSeat(key)}>
                                <a>{j + 1}</a>
                            </div>)
                            :
                            (<div id={key} className="selectBtn" onClick={() => this.unlockSeat(key)}>
                                <a>{j + 1}</a>
                            </div>)) :
                        (<div id={key} className="lockedBtn">
                            <a>{j + 1}</a>
                        </div>)
                    }
                </td>);
            }

        }
        return (
            <div >
                <nav class="navbar navbar-inverse">
                </nav>
                <div className="container">
                    <table>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <button type="button" class="bookButton" onClick={() => this.bookSeat(this.state.locked)}>Book</button>
                    <div class="footer">
                </div>
                </div>

            </div>

        )
    }
}

export default GridComponent;