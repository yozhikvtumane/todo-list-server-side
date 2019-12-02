import React from "react";

export default class NewItem extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      text: ""
    };
  }
  handleChange(opt) {
    this.setState({
      text: opt.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    if(typeof this.props.onItemCreate === "function"){
      this.props.onItemCreate(this.state.text);
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
