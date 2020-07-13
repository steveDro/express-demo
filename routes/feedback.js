const express = require("express");
const router = express.Router();
const Joi = require("joi");

const schema = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
};

module.exports = (param) => {
  const { feedbackService } = param;

  router.get("/", async (req, res) => {
    const feedbacks = await feedbackService.getList();
    const errors = req.session.feedback ? req.session.feedback.errors : false;
    const successMessage = req.session.feedback
      ? req.session.feedback.message
      : false;

    req.session.feedback = {};

    return res.render("layouts", {
      pageTitle: "Feedback",
      template: "feedback",
      feedbacks,
      errors,
      successMessage,
    });
  });
  router.post("/", async (req, res) => {
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      req.session.feedback = {
        errors: error.details[0].message,
      };
    } else {
      const { title, email, name, message } = req.body;
      await feedbackService.addEntry(name, email, title, message);
      req.session.feedback = {
        message: "Thank you for your feedback",
      };
    }

    return res.redirect("/feedback");
  });

  router.post("/api", async (req, res) => {
    try {
      const { error } = Joi.validate(req.body, schema);
      if (error) {
        return res.status(400).send(error);
      }

      const { title, email, name, message } = req.body;
      await feedbackService.addEntry(name, email, title, message);

      const feedback = await feedbackService.getList();
      res.json({ feedback, successMessage: "Thank you for your feedback" });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
