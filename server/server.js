const path = require('path');
const cors = require("cors");
const http = require("http");
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
var bodyParser = require('body-parser');
const { propsValidator, validationResultFormatted } = require("./propsValidator");


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static("build"));
// Accept Cross Origin Requests
app.use(cors());

// Use body parser and send an error if there are any errors, like SyntaxError
app.use(bodyParser.json())
app.use(propsValidator)


app.get("/", (req, res) => {
  res.send("Welcome to the simple Node server!");
});

app.post("/post", (request, response) => {
    // Validate the properties before creating and sending the message.
    const dataTorespond = {
      name: 'Name was received',
      job: 'Developer. Well done!',
      Description: 'You\'re getting this from the server'
    };

    try {
      console.log(request.body);
      const errors = validationResultFormatted(request);
      if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.mapped() });
      }

      const fromServer = dataTorespond;
      response.send({
        DataFromServer: fromServer,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "TypeError") {
        return response.status(400).send("There was a problem");
      } else {
        return response.status(400).send("An error has occured");
      }
    }
});




server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
