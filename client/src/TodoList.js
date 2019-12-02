import React from "react";
import NewItem from "./NewItem";
import TodoItem from "./TodoItem";
import Loading from "./Loading";
import Calls from "./calls";
export default class TodoList extends React.Component {
  constructor() {
    super();
    this.handleItemCreate = this.handleItemCreate.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      items: [],
      loadingState: "INIT"
    };
  }
  async componentDidMount() {
    this.setState({ loadingState: "LOADING" });
    try {
      let result = await Calls.getShoppingList();
      this.setState({ items: result, loadingState: "DONE" });
    } catch (error) {
      this.setState({ error:error, loadingState: "ERROR" });
    }
  }

  async handleItemCreate(item) {
    /*
    let stateItem = {
      text: item,
      id: Date.now()
    };
*/
    let serverItem = await Calls.createShoppingItem({
      content: item,
      state: "NEW",
      count: 1,
      createdAt: new Date().toUTCString()
    });
    this.setState({
      items: [...this.state.items, serverItem]
    });
  }
  async handleDelete(itemId) {
    await Calls.deleteShoppingItem({ id: itemId });
    let newArray = this.state.items.filter(value => value.id != itemId);
    this.setState({
      items: newArray
    });
  }
  renderItems() {
    return this.state.items.map(value => (
      <TodoItem key={value.id} item={value} onDelete={this.handleDelete} />
    ));
  }
  render() {
    switch (this.state.loadingState) {
      case "LOADING":
        return <Loading />;
      case "DONE":
        return (
          <div>
            <NewItem onItemCreate={this.handleItemCreate} />
            {this.renderItems()}
          </div>
        );
      case "ERROR":
        return <div>Error: {""+this.state.error}</div>;
      default:
        return <div>Error</div>;
    }
  }
}
