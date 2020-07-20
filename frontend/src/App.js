import React from "react";
import logo from "./logo.svg";
import io from "socket.io-client";
import "./App.css";
import fire from "./config/Fire.js";
import Login from "./components/Login/Login.js";
import { FadeLoader } from "react-spinners";
import Chat from "./components/Chat/Chat.js";
import NicknameInput from "./components/NicknameInput/NicknameInput.js";
class App extends React.Component {
  constructor() {
    super();
    this.socket = null;
    this.state = {
      userName: "",
      systemMessage: "",
      messageText: "",
      messages: [],
      user: null,
      loaded: false,
      nickName: null
    };
  }

  initiateConnection = () => {
    this.socket = io.connect("http://localhost:8080");
  };

  initiateMessageListener = () => {
    this.socket.on("chat message", msg => {
      this.setState({
        messages: [...this.state.messages, msg.message]
      });
    });
  };

  initiateNewJoinListener = () => {
    this.socket.on("newly joined", data => {
      this.setState({
        systemMessage: data.message
      });
    });
  };

  logout = () => {
    fire.auth().signOut();
  };

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          loaded: true
        });
        // this.getUserInfo(user);
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({
          user: null,
          loaded: true
        });
        localStorage.removeItem("user");
      }
    });
  };

  getNickName = nickName => {
    this.setState({
      nickName: nickName
    });
  };

  getUserInfo = user => {
    this.setState({
      user: user,
      loaded: true
    });
  };

  componentDidMount() {
    this.authListener();
    // this.initiateConnection();
    // this.initiateMessageListener();
    // this.initiateNewJoinListener();
  }

  displayLogin = () => {
    if (this.state.user && this.state.nickName) {
      return <Chat nickName={this.state.nickName} logout={this.logout} />;
    } else if (!this.state.loaded) {
      return (
        <>
          <FadeLoader
            sizeUnit={"px"}
            size={500}
            color={"#123abc"}
            loading={!this.state.loaded}
          />{" "}
        </>
      );
    } else if (!this.state.user) {
      return (
        <>
          <Login
            getNickName={this.getNickName}
            getUserInfo={this.getUserInfo}
          />
        </>
      );
    } else if (!this.state.nickName) {
      return (
        <>
          <NicknameInput getNickName={this.getNickName} />
        </>
      );
    }
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="App">
        {this.state.loaded ? (
          <>{this.displayLogin()}</>
        ) : (
          <FadeLoader
            sizeUnit={"px"}
            size={500}
            color={"#123abc"}
            loading={!this.state.loaded}
          />
        )}
      </div>
    );
  }
}

export default App;
