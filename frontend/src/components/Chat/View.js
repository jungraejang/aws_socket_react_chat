import React, { useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Message from "./Message/Message.js";
export default function Chat(props) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom);

  return (
    <>
      <CssBaseline />
      <div
        style={{
	//more hacks
          height: "50vh",
          overflow: "scroll"
        }}
      >
        {props.messages.map(el => (
          <Message message={el} nickName={props.nickName} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={event => {
          props.sendMessage(event, props.message);
        }}
      >
        <TextField
          id="message"
          name="message"
          value={props.message}
          onChange={props.handleChange}
          style={{ width: "100%", border: "solid", marginTop: "5%" }}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
