import React, { Component } from "react";
import "./App.css";
import ListRow from "./ListWork/ListRow";

class App extends Component {
  countWork = 0;

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      list: [],
    };
    this.GetData();
  }

  CheckDone = (id, isdone) => {
    fetch(`http://localhost:8081/update-work?id=${id}&isdone=${isdone}`, {
      method: 'PUT'
    }).then((res) => {
      this.GetData();
    })
  }

  GetData() {
    fetch('http://localhost:8081/get-works')
      .then(result => result.json())
      .then((res) => {
        this.setState({
          list: res.data
        })
      })
  }

  DeleteWork = (id) => {
    //alert(id);
    fetch('http://localhost:8081/delete-work', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id
      })
    }).then(res => {
      this.GetData();
    })
  }

  DescriptionChangeEvent = (event) => {
    this.setState({ description: event.target.value.toString() });
  };

  AddWorkEvent = (event) => {
    var this_App = this;
    if (this.state.description !== "") {
      fetch('http://localhost:8081/add-work', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isdone: false,
          description: this.state.description
        })
      }).then(function (response) {
        this_App.GetData();
      });

      document.getElementById("add-work-form").reset();
    } else {
      alert("none description input");
    }

    event.preventDefault();
  };

  render() {
    return (
      <div className="cont">
        {/* Form add new work */}
        <div className="add-work-field">
          <div className="form-group">
            <form id="add-work-form">
              <input
                placeholder="What needs to be done?"
                className="form-control"
                onChange={this.DescriptionChangeEvent}
              >
              </input>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.AddWorkEvent}
              >
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="list-work-field">
          <span>TODO LIST</span>
          <hr></hr>
          <div className="list-work">{
            this.state.list.map((value, index) => {
              return (
                <ListRow
                  isdone={value.isdone}
                  des={value.description}
                  id={value._id}
                  key={value._id}
                  deleteWork={this.DeleteWork}
                  checkDone={this.CheckDone}
                ></ListRow>
              )
            })
          }</div>
        </div>
      </div>
    );
  }
}

export default App;