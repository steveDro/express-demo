const express = require("express");
const router = express.Router();

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

module.exports = (param) => {
  const { speakerService } = param;

  router.get("/", async (req, res) => {
    const topSpeakers = await speakerService.getList();
    res.render("layouts", {
      title: "Welcome",
      template: "index",
      topSpeakers,
    });
  });

  router.use("/speakers", speakersRoute(param));
  router.use("/feedback", feedbackRoute(param));

  return router;
};
