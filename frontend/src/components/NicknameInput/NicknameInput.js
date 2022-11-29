import React from "react";
import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import View from "./View";
import Paper from "@material-ui/core/Paper";
import backgroundImg from "../../images/citicorner.jpg";
import nicknameImage from "../../images/citi.jpg";

export default class NicknameInput extends React.Component {
  constructor() {
    super();
    this.state = {
      nickName: "",
      targetLanguageCode: "en",
      userLanguageCode: "en",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUserLanguageChange = (event) => {
    this.setState({
      userLanguageCode: event.target.value,
    });
  };

  handleTargetLanguageChange = (event) => {
    this.setState({
      targetLanguageCode: event.target.value,
    });
  };

  componentDidMount() {
    console.log("nickname selection");
    console.log("language list", this.props);
  }

  render() {
    console.log("nickname state", this.state);
    return (
      <div
        style={{
          paddingTop: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          // width: null,
          // height: null,
          // backgroundImage: `url(${backgroundImg})`,
          // flex: 1,
          // resizeMode: 'cover',
          backgroundRepeat: "no-repeat",
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
            // backgroundImage: `url(${nicknameImage})`,
            backgroundColor: "rgba(0, 58, 114, 0.3)",
            // backgroundRepeat: "no-repeat"
          }}
        >
          <form
            onSubmit={() => {
              this.props.getNickName(
                this.state.nickName,
                this.state.userLanguageCode,
                this.state.targetLanguageCode
              );
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
            }}
          >
            <p>Choose your nickname</p>
            <TextField
              id="nickName"
              name="nickName"
              label="Nickname"
              value={this.state.nickName}
              onChange={this.handleChange}
              style={{
                width: "70%",
              }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "blue",
                marginTop: "10%",
                color: "white",
              }}
              type="submit"
            >
              Join the chat
            </Button>
          </form>
          <form onSubmit={this.handleSubmit}>
            <label>
              Translate from:
              <select
                value={this.state.value}
                onChange={this.handleUserLanguageChange}
              >
                <option value="en">English</option>
                <option value="fr">Francais</option>
                <option value="ar">Arabic</option>
                <option value="ko">한국어</option>
                <option value="pt">Portuguese</option>
              </select>
            </label>
          </form>
          <form onSubmit={this.handleSubmit}>
            <label>
              Translate to:
              <select
                value={this.state.value}
                onChange={this.handleTargetLanguageChange}
              >
                <option value="en">English</option>
                <option value="fr">Francais</option>
                <option value="ar">Arabic</option>
                <option value="ko">한국어</option>
                <option value="pt">Portuguese</option>
              </select>
            </label>
          </form>
        </Paper>
      </div>
    );
  }
}
