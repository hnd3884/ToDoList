import React, { Component } from 'react';
import './ListRow.css'

class ListRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            des : props.des,
            id : props.id
        }
    }

    SendDeleteMessage(id) {
        this.props.deleteWork(id);
    }

    render() {
        const ListRowField = (
            <div className="work-row">
                &nbsp;&nbsp;
                <input type="checkbox"></input>
                &nbsp; {this.state.des}
                <button type="button" className="btn btn-danger" onClick={this.SendDeleteMessage.bind(this, this.state.id)}>Delete</button>
                <hr></hr>
            </div>
        );

        return ListRowField;
    }
}

export default ListRow;