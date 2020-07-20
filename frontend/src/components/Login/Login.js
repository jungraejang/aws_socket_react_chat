import React from "react";
import View from "./View.js";
import fire from "../../config/Fire.js";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: null,
      nickName: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signup = event => {
    event.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log("u1", u);
      })
      .then(u => {
        console.log("u2", u);
      })
      .catch(error => {
        console.log(error);
      });
  };

  login = event => {
    event.preventDefault();
    this.props.getNickName(this.state.nickName);
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {})
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    // this.authListener();
  }

  render() {
    let { password, email } = this.state;
    return (
      <div>
        <View
          login={this.login}
          nickName={this.nickName}
          password={password}
          email={email}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
