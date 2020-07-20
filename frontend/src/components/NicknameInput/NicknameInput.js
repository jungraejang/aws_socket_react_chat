import React from "react";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import View from "./View";
import Paper from "@material-ui/core/Paper";
import backgroundImg from "../../images/login-background.jpg";
import nicknameImage from "../../images/nickname_screen_image.png";

export default class NicknameInput extends React.Component {
  constructor() {
    super();
    this.state = {
      nickName: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          paddingTop: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${backgroundImg})`
        }}
      >
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
            height: "50%",
            marginBottom: "10%",
            backgroundImage: `url(${nicknameImage})`
          }}
        >
          <form
            onSubmit={() => {
              this.props.getNickName(this.state.nickName);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%"
            }}
          >
            <p>Choose your nickname</p>
            <TextField
              id="nickName"
              name="nickName"
              label="Nickname"
              value={this.state.nickName}
              onChange={this.handleChange}
              style={{ width: "70%" }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "purple",
                marginTop: "10%",
                color: "white"
              }}
              type="submit"
            >
              Join the chat
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
