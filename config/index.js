require("dotenv").config();
const bunyan = require("bunyan");

module.exports = {
  development: {
    sitename: "My express app -development",
    log: () => bunyan.createLogger({ name: "development", level: "debug" }),
    database: {
      dsn: process.env.DB_HOST,
    },
  },
};
