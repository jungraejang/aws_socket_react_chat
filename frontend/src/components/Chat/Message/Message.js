import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  ownMessage: {
    display: "flex",
    marginTop: "10px",
    backgroundColor: "purple",
    color: "white",
    textAlign: "left",
    minHeight: "10%",
    height: "auto",
    paddingLeft: "5%"
  },
  otherMessage: {
    marginTop: "10px",
    backgroundColor: "skyblue",
    color: "white",
    textAlign: "right",
    minHeight: "10%",
    height: "auto",
    paddingRight: "5%"
  }
}));

export default function Message(props) {
  const classes = useStyles();

  return (
    <Paper
      className={
        props.nickName === props.message.nickName
          ? classes.ownMessage
          : classes.otherMessage
      }
      square={false}
    >
      <Typography>
        {props.message.nickName} said:
        <br />
        {props.message.message}
      </Typography>
    </Paper>
  );
}
