import React from "react";
import io from "socket.io-client";
import View from "./View.js";
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      messages: [],
      systemMessage: "",
      userName: "",
      message: ""
    };
  }

  initiateConnection = () => {
    this.socket = io.connect("http://54.161.12.72:8080");
  };

  initiateMessageListener = () => {
    this.socket.on("chat message", msg => {
      console.log("msg msg", msg);
      this.setState({
        messages: [...this.state.messages, msg.message]
      });
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  initiateNewJoinListener = () => {
    this.socket.on("newly joined", data => {
      this.setState({
        systemMessage: data.message
      });
    });
  };

  sendMessage = (event, message) => {
    event.preventDefault();
    let messageData = {
      message: message,
      nickName: this.props.nickName,
      sourceLanguageCode: this.props.userLanguageCode,
      targetLanguageCode: this.props.targetLanguageCode
    };
    this.socket.emit("chat message", messageData);
    this.setState({
      message: ""
    });
  };

  componentDidMount() {
    this.initiateConnection();
    this.initiateMessageListener();
    this.initiateNewJoinListener();
  }

  render() {
    console.log("chat props", this.props);
    console.log("chat state", this.state);
    return (
      <div>
        <h1>Welcome to RatChat. Chat app for Ratchet ppl</h1>
        <p id="nickName">Welcome Nickname: {this.props.nickName}</p>
        <button onClick={this.props.logout}>Log out!</button>
        <View
          messages={this.state.messages}
          message={this.state.message}
          handleChange={this.handleChange}
          sendMessage={this.sendMessage}
          nickName={this.props.nickName}
          systemMessage={this.state.systemMessage}
        />
      </div>
    );
  }
}
