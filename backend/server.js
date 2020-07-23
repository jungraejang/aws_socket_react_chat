const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const aws = require("aws-sdk");
require("dotenv").config();
console.log("aws region", process.env.AWS_REGION);

aws.config.region = process.env.AWS_REGION;
aws.config.credentials = new aws.Credentials(
  process.env.AWS_ACCES_KEY_ID,
  process.env.AWS_SECRET_ACCESS_KEY
);

const translateService = new aws.Translate();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// app.get("/:room", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

//destLang, sourceLang

const getTranslation = async msg => {
  const params = {
    Text: msg.message,
    SourceLanguageCode: msg.sourceLanguageCode,
    TargetLanguageCode: msg.targetLanguageCode
  };

  const tranlatedMsg = await translateService
    .translateText(params, (err, data) => {
      return data;
    })
    .promise();

  return tranlatedMsg;
};

io.on("connection", async socket => {
  console.log("a user connected", socket.id);

  io.emit("newly joined", { message: socket.id + "has joined the chat" });

  socket.broadcast.emit("hi!");

  socket.on("chat message", async msg => {
    console.log("message: ", msg);
    //insert code block for translation
    const translatedMsg = await getTranslation(msg);
    translatedText = translatedMsg.TranslatedText;
    console.log("translatedText", translatedText);
    //socket emits translated message back
    await io.emit("chat message", {
      message: {
        translatedMessage: translatedText,
        nickName: msg.nickName,
        originalMessage: msg.message
      },
      id: socket.id
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(8080, () => {
  console.log("listening to port 8080");
});
