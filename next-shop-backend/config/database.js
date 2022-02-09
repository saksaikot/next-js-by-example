const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: ".data/database.sqlite3",
      // filename: env("DATABASE_FILENAME", ".data/database.sqlite3"),
    },
    useNullAsDefault: true,
  },
});