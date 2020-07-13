const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const cookieSession = require("cookie-session");
// const bodyParser = require("body-parser");

const config = require("./config")[process.env.NODE_ENV || "development"];
const logger = require("./middleware/logger");
const speakers = require("./middleware/speakers");
const index = require("./routes");
const FeedbackService = require("./services/FeedbackService");
const SpeakerService = require("./services/SpeakerService");

const feedbackService = new FeedbackService("./data/feedback.json");
const speakerService = new SpeakerService("./data/speakers.json");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("static"));
app.use(helmet());

app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["1234ewe323", "Ge793293"],
  })
);

// app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

// setting global variables
app.locals.sitename = "My Express App";
app.use(speakers(speakerService));

// routes
app.use(
  "/",
  index({
    feedbackService,
    speakerService,
  })
);
// const log = config.log();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //   log.debug("morgan enabled...");
}

// custom middleware
app.use(logger);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
