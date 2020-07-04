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

  GetData(){
    fetch('http://localhost:8081/get-works')
    .then(result => result.json())
    .then((res) => {
      console.log(res.data);
    })
  }

  DeleteWork = (id) => {
    var new_list = this.state.list;
    for(var i = 0;i<new_list.length;i++){
      if(new_list[i].id === id){
        new_list.splice(i,1);
        break;
      }
    }

    this.setState({
      list: new_list
    })
  }

  DescriptionChangeEvent = (event) => {
    this.setState({ description: event.target.value.toString() });
  };

  AddWorkEvent = (event) => {
    event.preventDefault();
    if (this.state.description !== "") {
      var row = {
        id: this.countWork,
        data: this.state.description
      }
      this.setState({
        description: "",
        list: [...this.state.list, row],
      });

      this.countWork += 1;
      document.getElementById("add-work-form").reset();
    } else {
      alert("none description input");
    }
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
                  des={value.data}
                  id={value.id}
                  key={value.id}
                  deleteWork={this.DeleteWork}
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
