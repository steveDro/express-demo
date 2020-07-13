const express = require("express");
const router = express.Router();

module.exports = (param) => {
  const { speakerService } = param;

  router.get("/", async (req, res) => {
    const speakers = await speakerService.getList();
    const artworks = await speakerService.getAllArtwork();
    res.render("layouts", {
      pageTitle: "Speakers",
      template: "speakers",
      speakers,
      artworks,
    });
  });
  router.get("/:shortname", async (req, res) => {
    const shortname = req.params.shortname;
    const speakerDetails = await speakerService.getSpeaker(shortname);
    const artworks = await speakerService.getArtworkForSpeaker(shortname);
    res.render("layouts", {
      template: "speaker-details",
      artworks,
      speakerDetails,
    });
  });

  return router;
};
