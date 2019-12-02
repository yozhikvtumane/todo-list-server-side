import React from "react";

export default class TodoItem extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
      console.log("handleDelete");
    if (typeof this.props.onDelete === "function") {
        console.log("handleDelete2");
        this.props.onDelete(this.props.item.id);
    }
  }
  render() {
    return (
      <div>
        {this.props.item.content}
        <button onClick={this.handleDelete}>Smaž</button>
      </div>
    );
  }
}
