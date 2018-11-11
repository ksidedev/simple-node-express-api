const path = require('path');
const cors = require("cors");
const http = require("http");
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const { body, validationResult } = require("express-validator/check");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static("build"));

// Accept Cross Origin Requests
app.use(cors());

const addRawBody = (req, res, buf) => {
    req.rawBody = buf.toString();
};

app.get("/", (req, res) => {
    res.send("Welcome to the simple Node server!");
});

app.post("/", (request, response) => {
    // Validate the properties before creating and sending the message.
    const data = {
      name: 'Foo',
      job: 'Developer',
      Description: 'This is the description'
  };

  const validationResultFormatted = validationResult.withDefaults({
      formatter: ({ value, msg, nestedErrors }) => (
          {
              value, msg, nestedErrors
          }
      )
  });

    try {
        console.log(request.body);
        const errors = validationResultFormatted(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.mapped() });
        }

        const props = request.body;
        const fromServer = data;
        const dateFromServer = moment();
        response.send({
            props,
            DataFromServer: fromServer,
            date: dateFromServer
        });
    } catch (error) {
        console.log(error);
        if (error.name === "TypeError") {
            return response.status(400).send("There was a problem building the SBD");
        } else {
            return response.status(400).send("An error has occured");
        }
    }
});




server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
