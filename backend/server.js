const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const aws = require("aws-sdk");
const fs = require('fs');
const multer = require('multer');
const textractRoute= require('./textractRoute');
require("dotenv").config();
console.log("aws region", process.env.AWS_REGION);
const cors = require('cors');
app.use(cors());

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});


aws.config.region = process.env.AWS_REGION;
aws.config.credentials = new aws.Credentials(
  process.env.AWS_ACCES_KEY_ID,
  process.env.AWS_SECRET_ACCESS_KEY
);


const translateService = new aws.Translate();

app.use(express.static(__dirname));
// app.use('/textract', textractRoute);

app.post("/", upload.single('myImage'), async (req, res, err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);
      console.log('bucket' + process.env.BUCKET_NAME);
      const s3 = new aws.S3();
      console.log('s3: ' + s3);
      console.log('req.file' + req.file.path);
      var paramsForS3 = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(req.file.path),
        Key: `${req.file.originalname}`
      };
      console.log('paramss3' + paramsForS3);

      await s3.upload(paramsForS3, (err, data) => {
        console.log('does this  ever run')
          if (err) {
            console.log('Error occured while trying to upload to S3 bucket', err);
          }

          if (data) {
            console.log('we got data: ' + data)
            fs.unlinkSync(req.file.path); // Empty temp folder4
            const locationUrl = data.Location;
            let newUser = new Users({ ...req.body, avatar: locationUrl });
            newUser
              .save()
              .then(user => {
                res.json({ message: 'Data saved', data });
              })
              .catch(err => {
                console.log('Error occured while trying to save to DB');
              });
          }
      });

  
      let textract = new aws.Textract();
      var params = { Document: req.file};
      await textract.detectDocumentText(params, function(err, data){
        console.log('data:' + data);
        console.log('err' + err);
      })
      res.send(req.file)
      if(err){
        console.log(err);
         return res.send(200).end();
      }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// app.get("/:room", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

//destLang, sourceLang

const getTranslation = async msg => {
  const params = {
    Text: msg,
    SourceLanguageCode: "en",
    TargetLanguageCode: "es"
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
    const translatedMsg = await getTranslation(msg.message);
    translatedText = translatedMsg.TranslatedText;
    console.log("translatedText", translatedText);
    //socket emits translated message back
    await io.emit("chat message", {
      message: { message: translatedText, nickName: msg.nickName },
      id: socket.id
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(8080, () => {
  console.log("listening to port 8000");
});
