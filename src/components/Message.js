import React, { Component } from "react";

class Message extends Component {
  render() {
    console.log(this.props.thread.ts.toDate());
    var dt = new Date(this.props.thread.ts);
    console.log(dt.toString());
    return (
      <li
        onClick={this.props.handleClick.bind(null)}
        className={this.props.show ? "bg-warning" : "bg-info"}
        style={{ margin: "10px auto" }}
      >
        <button
          onClick={this.props.removeMessage.bind(null)}
          className="btn btn-danger"
        >
          X
        </button>
        {this.props.thread.title}
        {this.props.show && (
          <p>
            {this.props.thread.message + "  " + this.props.thread.ts.toDate()}
          </p>
        )}
      </li>
    );
  }
}

export default Message;
